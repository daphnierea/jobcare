<template>
    <v-app>
        <views-navigation :color="color" :flat="flat" />
        <div class="signin">
            <v-container class="signin-container" fluid fill-height>
                <v-row justify="center">
                    <v-col cols="12" md="8">
                        <v-container
                            width="80vw"
                            max-width="100vw"
                            min-width="400"
                            fluid
                        >
                            <v-row justify="center">
                                <v-col id="column-1" cols="12" lg="8" class="">
                                    <v-row justify="center" class="text-center">
                                        <h1
                                            class="pa-5 font-weight-bold primary--text"
                                        >
                                            SIGN-IN
                                        </h1>
                                    </v-row>
                                    <v-row justify="center">
                                        <v-col cols="12" md="7">
                                            <v-card
                                                class="transparent elevation-0"
                                            >
                                                <v-form
                                                    ref="login"
                                                    lazy-validation
                                                >
                                                    <v-card-text>
                                                        <v-alert
                                                            small
                                                            type="error"
                                                            v-if="error"
                                                        >
                                                            <span>{{
                                                                error
                                                            }}</span>
                                                        </v-alert>
                                                        <v-text-field
                                                            v-model="email"
                                                            label="Email"
                                                            name="email"
                                                            id="email"
                                                            prepend-icon="mdi-account"
                                                            :rules="
                                                                rules.emailRules
                                                            "
                                                            type="text"
                                                            @keydown.enter="
                                                                login()
                                                            "
                                                        ></v-text-field>
                                                        <v-text-field
                                                            v-model="password"
                                                            label="Password"
                                                            id="password"
                                                            name="password"
                                                            prepend-icon="fa-lock"
                                                            :append-icon="
                                                                visible
                                                                    ? 'mdi-eye-off'
                                                                    : 'mdi-eye'
                                                            "
                                                            @click:append="
                                                                visible = !visible
                                                            "
                                                            :rules="
                                                                rules.passwordRules
                                                            "
                                                            :type="
                                                                visible
                                                                    ? 'text'
                                                                    : 'password'
                                                            "
                                                            @keydown.enter="
                                                                login()
                                                            "
                                                        ></v-text-field>
                                                    </v-card-text>
                                                </v-form>
                                                <v-card-actions>
                                                    <v-btn
                                                        color="primary"
                                                        large
                                                        block
                                                        @click="
                                                            login(),
                                                                (loader =
                                                                    'loading')
                                                        "
                                                        class="ma-2"
                                                        :loading="loading"
                                                        :disabled="loading"
                                                    >
                                                        Sign-in
                                                        <template v-slot:loader>
                                                            <span
                                                                class="custom-loader"
                                                            >
                                                                <v-icon light
                                                                    >mdi-cached</v-icon
                                                                >
                                                            </span>
                                                        </template>
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
            <!-- <div class="shape"></div> -->
        </div>
    </v-app>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            loading: false,
            username: null,
            password: null,
            visible: false,
            error: null,
            rules: {
                usernameRules: [
                    v => !!v || "Username is required",
                    v =>
                        (!!v && v.length <= 255) ||
                        "Username must be more than 255 characters"
                ],
                emailRules: [
                    v => !!v || "E-mail is required",
                    v =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "E-mail must be valid",
                    v =>
                        (!!v && v.length <= 255) ||
                        "E-mail must be more than 255 characters"
                ],
                passwordRules: [
                    v => !!v || "Password is required",
                    v =>
                        (!!v && v.length >= 6) ||
                        "Password must be atleast 6 characters",
                    v =>
                        (!!v && v.length <= 255) ||
                        "Password must be more than 255 characters"
                ]
            },

            fab: null,
            color: "",
            flat: null
        };
    },

    methods: {
        login() {
            this.$router.push("admin/dashboard");
            // if (this.$refs.login.validate()) {
            //     this.loading = true;
            //     axios
            //         .post("/api/v1/login", {
            //             username: this.username,
            //             password: this.password
            //         })
            //         .then(response => {
            //             if (response.data.errors) {
            //                 this.error = response.data.errors;
            //                 return;
            //             }
            //             var token = response.data.token;
            //             // var user_id = response.data.id;
            //             // var profile_id = response.data.profile_id;
            //             // var profile_role = response.data.profile_role;
            //             // var user_type = response.data.role;
            //             // Create a local storage item
            //             sessionStorage.setItem("user-token", token);
            //             // sessionStorage.setItem("user-type", user_type);
            //             // sessionStorage.setItem("user-id", user_id);
            //             // sessionStorage.setItem("profile-id", profile_id);
            //             // sessionStorage.setItem("profile-role", profile_role);

            //             // Echo.connector.pusher.config.auth.headers[
            //             //     "Authorization"
            //             // ] = "Bearer " + token;

            //             // console.log(
            //             //     Echo.connector.pusher.config.auth.headers[
            //             //         "Authorization"
            //             //     ]
            //             // );

            //             // Redirect user
            //             // if (user_type == "ADMINISTRATOR")
            //             this.$router.push("admin/dashboard");
            //             // else if (user_type == "HOSPITAL") {
            //             //     this.$router.push("hospital/dashboard");
            //             // } else if (user_type == "OCCUPANT") {
            //             //     this.$router.push("/dashboard");
            //             // }
            //             swal.fire({
            //                 position: "top-end",
            //                 toast: true,
            //                 type: "success",
            //                 icon: "success",
            //                 text: "Successfully Logined",
            //                 showConfirmButton: false,
            //                 timer: 1500
            //             });
            //         })
            //         .catch(error => {
            //             if (error.response.data == "Unauthenticated.") {
            //                 sessionStorage.clear();
            //                 this.$router.push("/login");
            //                 swal.fire("Error!", error.response.data, "error");
            //             } else if (error.response.status == 403) {
            //                 swal.fire(
            //                     "Inactive Account!",
            //                     error.response.data,
            //                     "error"
            //                 );
            //             } else {
            //                 swal.fire("Invalid Credentials!", error, "error");
            //             }
            //         })
            //         .finally(x => {
            //             this.loading = false;
            //         });
            // }
        },

        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 60;
        },
        toTop() {
            this.$vuetify.goTo(0);
        }
    },

    watch: {
        fab(value) {
            if (value) {
                this.color = "#f8f9fa";
                this.flat = false;
            } else {
                this.color = "transparent";
                this.flat = true;
            }
        }
    },

    created() {
        this.toTop();
        const top = window.pageYOffset || 0;
        if (top <= 60) {
            this.color = "transparent";
            this.flat = true;
        }
    },

    beforeRouteEnter(to, from, next) {
        if (sessionStorage.getItem("user-type")) {
            if (sessionStorage.getItem("user-type") == "ADMINISTRATOR") {
                return next("admin/dashboard");
            } else if (sessionStorage.getItem("user-type") == "HOSPITAL") {
                return next("hospital/dashboard");
            } else if (sessionStorage.getItem("user-type") == "OCCUPANT") {
                return next("/dashboard");
            }
        }
        next();
    }
};
</script>
<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
