<template>
    <v-container fluid>
        <!-- <v-overlay :value="componentOverlay">
            <v-progress-circular
                :size="100"
                :width="5"
                indeterminate
            ></v-progress-circular>
        </v-overlay> -->
        <v-row justify-center wrap>
            <v-col md10>
                <v-card class="elevation-9 ma-4">
                    <v-container>
                        <v-data-table
                            :loading="tableLoading"
                            loading-text="Fetching job list... Please wait"
                            :headers="tableJobHeaders"
                            :items="tableJobs"
                            :search="tableSearch"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title class="headline"
                                        >Jobs</v-toolbar-title
                                    >
                                    <div class="flex-grow-1"></div>
                                    <v-btn
                                        small
                                        @click="formJobDialog = true"
                                        color="primary"
                                    >
                                        <v-icon small left
                                            >mdi-plus-circle</v-icon
                                        >
                                        Add Job
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.id="{ item }">
                                {{
                                    tableJobs
                                        .map(function(x) {
                                            return x.id;
                                        })
                                        .indexOf(item.id) + 1
                                }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn icon @click="editJob(item)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon @click="deleteJob(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="formJobDialog" max-width="500px" persistent>
            <v-card>
                <v-overlay :value="componentOverlay">
                    <v-progress-circular
                        :size="100"
                        :width="5"
                        indeterminate
                    ></v-progress-circular>
                </v-overlay>
                <v-card-title class="headline">
                    {{ formJobTitle }}
                </v-card-title>
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="text"
                                :error-messages="formJobErrors.username"
                                v-model="editedJobInformation.username"
                                label="Username"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="editedJobInformation.password"
                                label="Password"
                                id="password"
                                name="password"
                                prepend-icon="fa-lock"
                                :append-icon="
                                    visible ? 'mdi-eye-off' : 'mdi-eye'
                                "
                                @click:append="visible = !visible"
                                :rules="rules.passwordRules"
                                :type="visible ? 'text' : 'password'"
                                @keydown.enter="login()"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="text"
                                :error-messages="formJobErrors.name"
                                v-model="editedJobInformation.name"
                                label="Name"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="text"
                                :error-messages="formJobErrors.number"
                                v-model="editedJobInformation.number"
                                label="Number"
                            />
                        </v-col>
                    </v-row>
                    <v-row
                        ><v-col cols="12">
                            <GmapMap
                                style="width: 100%; height: 400px;"
                                :zoom="25"
                                :center="center"
                            >
                                <GmapMarker
                                    @drag="changed"
                                    label="★"
                                    :draggable="true"
                                    :position="address"
                                /> </GmapMap
                        ></v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="px-12" text @click="closeJobForm"
                        >Cancel</v-btn
                    >
                    <v-btn class="px-12" @click="saveJob" color="primary"
                        >Save</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            componentOverlay: false,
            // profileId: sessionStorage.getItem("profile-id"),
            tableLoading: true,
            tableSearch: null,
            searchInput: "",
            visible: false,
            //Job
            tableJobs: [],
            formJobDialog: false,
            formJobListDialog: false,

            formJobErrors: {
                name: null
            },

            tableJobHeaders: [
                { text: "ID", value: "id" },
                { text: "Name", value: "name" },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "center"
                }
            ],

            editedJobIndex: -1,
            editedJobInformation: {
                name: null
            },

            //Google Maps Variables
            center: { lat: 6.9214, lng: 122.079 },
            address: { lat: 6.9214, lng: 122.079 },

            rules: {
                required: [
                    v => !!v || "Field is required",
                    v =>
                        (!!v && v.length <= 255) ||
                        " Field should not be more than 255 characters"
                ],
                emailRules: [
                    v => !!v || "E-mail is required",
                    v =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "E-mail must be valid",
                    v =>
                        (!!v && v.length <= 255) ||
                        "E-mail must not be more than 255 characters"
                ],
                jobRules: [
                    v => !!v || "Job Number is required",
                    v =>
                        (!!v && v.length >= 10) ||
                        "Job Number must be 11 characters",
                    v =>
                        (!!v && v.length < 11) ||
                        "Job Number must not be more than 11 characters"
                ],
                passwordRules: [
                    v => !!v || "Password is required",
                    v =>
                        (!!v && v.length >= 8) ||
                        "Password must be more than 8 characters"
                ]
            }
        };
    },

    computed: {
        formJobTitle() {
            return this.editedJobIndex === -1 ? "New Job" : "Edit Job";
        }
    },

    mounted() {
        this.fetchJobs();
    },

    methods: {
        //Job
        fetchJobs() {
            this.tableLoading = true;
            this.componentOverlay = true;
            axios
                .get("/api/v1/jobs")
                .then(response => {
                    this.tableJobs = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.componentOverlay = false;
                    this.tableLoading = false;
                });
        },

        saveJob() {
            this.componentOverlay = true;
            if (this.editedJobIndex > -1) {
                this.updateJob();
            } else {
                this.createJob();
            }
        },

        createJob() {
            axios
                .post("/api/v1/jobs", {
                    ...this.editedJobInformation
                })
                .then(response => {
                    this.fetchJobs();
                    this.closeJobForm();
                    swal.fire({
                        position: "top-end",
                        toast: true,
                        type: "success",
                        icon: "success",
                        text: "Successfully Created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    this.componentOverlay = false;

                    if (error.response.status == 422) {
                        this.formJobErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        editJob(job) {
            this.editedJobIndex = this.tableJobs.indexOf(job);
            this.editedJobInformation = Object.assign({}, job);
            this.formJobDialog = true;
        },

        updateJob() {
            axios
                .put("/api/v1/jobs/" + this.editedJobInformation.id, {
                    ...this.editedJobInformation
                })
                .then(response => {
                    this.fetchJobs();
                    this.closeJobForm();
                    swal.fire({
                        position: "top-end",
                        toast: true,
                        type: "success",
                        icon: "success",
                        text: "Successfully Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    this.componentOverlay = false;

                    if (error.response.status == 422) {
                        this.formJobErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        deleteJob(job) {
            swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
                .then(result => {
                    if (result.value) {
                        axios
                            .delete("/api/v1/jobs/" + job.id)
                            .then(() => {
                                this.fetchJobs();
                                this.closeJobForm();
                                swal.fire(
                                    "Deleted!",
                                    "Job has been deleted.",
                                    "success"
                                );
                            })
                            .catch(error => {
                                swal.fire(
                                    "Failed!",
                                    "There was something wrong.",
                                    "warning"
                                );
                                this.error = response.data.errors;
                                if (
                                    error.response.data.message ==
                                    "Unauthenticated."
                                ) {
                                    sessionStorage.clear();
                                    this.$router.push("/login");
                                }
                                return;
                            });
                    }
                })
                .catch(() => {
                    swal("Failed!", "There was something wrong.", "warning");
                });
        },

        closeJobForm() {
            this.formJobDialog = false;
            this.componentOverlay = false;
            this.deleteDialog = false;
            setTimeout(() => {
                this.formJobErrors = {
                    name: null
                };
                this.editedJobInformation = Object.assign(
                    {},
                    this.defaultJobInformation
                );
                this.editedJobIndex = -1;
            }, 500);
        },

        //trigger everytime marker is drag
        changed(position) {
            this.editedEstablishmentInformation.latitude = position.latLng.lat();
            this.editedEstablishmentInformation.longitude = position.latLng.lng();
        },

        //Get Address to current location
        getUserGeolocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    this.setUserGeolocation
                );
            } else {
                window.clearInterval(window.locationInterval);
                alert("Geolocation is not supported by this browser.");
            }
        },

        //Set Address to current location
        setUserGeolocation(position) {
            var UserGeolocationLatitude = position.coords.latitude;
            var UserGeolocationLongitude = position.coords.longitude;
            this.center = {
                lat: UserGeolocationLatitude,
                lng: UserGeolocationLongitude
            };
            this.address = this.center;
        }
    }
};
</script>
