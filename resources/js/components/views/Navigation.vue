<template>
    <div>
        <v-navigation-drawer v-model="drawer" app temporary light>
            <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <img src="/img/jobcare.png" alt="Logo" to="/" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title"
                            >JobCare</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider />

            <v-list dense>
                <v-list-item
                    v-for="([icon, text, link], i) in items"
                    :key="i"
                    link
                    :to="link"
                >
                    <v-list-item-icon class="justify-center">
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="subtitile-1">{{
                            text
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            :color="color"
            :flat="flat"
            light
            :class="{
                expand: flat,
                'px-15': $vuetify.breakpoint.mdAndUp
            }"
        >
            <v-toolbar-title>
                <v-img
                    src="/img/jobcare.png"
                    max-width="120px"
                    @click="$router.push('/')"
                />
            </v-toolbar-title>
            <v-spacer />
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
                class="mr-4"
                v-if="isXs"
            />
            <div v-else>
                <v-btn
                    :ripple="false"
                    id="no-background-hover"
                    text
                    to="/signin"
                >
                    <span
                        :class="
                            this.$route.path == '/signin' ||
                            this.$route.path == '/signup'
                                ? 'white--text mr-2 font-weight-normal'
                                : 'black--text mr-2 font-weight-normal'
                        "
                        >Log in</span
                    >
                </v-btn>
                <v-btn id="btn-signup" color="primary" rounded to="/signup">
                    <span
                        class="'white--text mr-2 font-weight-normal'
                        "
                        >Sign up
                    </span>
                </v-btn>
            </div>
        </v-app-bar>
    </div>
</template>

<style scoped>
.v-toolbar {
    transition: 0.6s;
}

.v-toolbar__content {
    flex-direction: column !important;
}

.expand {
    height: 80px !important;
    padding-top: 10px;
}

#no-background-hover {
    font-family: "Roboto", sans-serif !important;
    font-weight: normal !important;
}

#no-background-hover:before {
    color: transparent;
}

#no-background-hover span:hover,
#no-background-hover span:focus {
    color: #1976d2 !important;
}

#btn-signup {
    font-family: "Roboto", sans-serif !important;
    font-weight: normal !important;
}

#btn-signup:before {
    color: transparent;
}

#btn-signup:hover,
#btn-signup:focus {
    background-color: #8ecf8d !important;
}
</style>

<script>
export default {
    data() {
        return {
            drawer: null,
            isXs: false,
            items: [
                ["mdi-home-outline", "Home", "/#hero"],
                ["mdi-information-outline", "Features", "/#features"],
                ["mdi-code-tags", "Developer", "/developers"],
                ["mdi-cash", "Pricing", "/pricing"],
                ["mdi-help-circle", "Faqs", "/faqs"],
                ["mdi-login", "Sign in", "/signin"],
                ["mdi-account-plus", "Sign up", "/signup"]
            ]
        };
    },
    props: {
        color: String,
        flat: Boolean
    },
    methods: {
        onResize() {
            this.isXs = window.innerWidth < 850;
        }
    },

    watch: {
        isXs(value) {
            if (!value) {
                if (this.drawer) {
                    this.drawer = false;
                }
            }
        }
    },
    mounted() {
        this.onResize();
        window.addEventListener("resize", this.onResize, { passive: true });
    }
};
</script>
