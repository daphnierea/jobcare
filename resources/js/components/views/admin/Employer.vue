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
                            loading-text="Fetching employer list... Please wait"
                            :headers="tableEmployerHeaders"
                            :items="tableEmployers"
                            :search="tableSearch"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title class="headline"
                                        >Employers</v-toolbar-title
                                    >
                                    <div class="flex-grow-1"></div>
                                    <v-btn
                                        small
                                        @click="formEmployerDialog = true"
                                        color="primary"
                                    >
                                        <v-icon small left
                                            >mdi-plus-circle</v-icon
                                        >
                                        Add Employer
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.id="{ item }">
                                {{
                                    tableEmployers
                                        .map(function(x) {
                                            return x.id;
                                        })
                                        .indexOf(item.id) + 1
                                }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn icon @click="editEmployer(item)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon @click="deleteEmployer(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="formEmployerDialog" max-width="500px" persistent>
            <v-card>
                <v-overlay :value="componentOverlay">
                    <v-progress-circular
                        :size="100"
                        :width="5"
                        indeterminate
                    ></v-progress-circular>
                </v-overlay>
                <v-card-title class="headline">
                    {{ formEmployerTitle }}
                </v-card-title>
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="text"
                                :error-messages="formEmployerErrors.employer_no"
                                v-model="editedEmployerInformation.employer_no"
                                label="Employer Number"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="items"
                                item-value="id"
                                item-text="name"
                                type="text"
                                :error-messages="formEmployerErrors.status"
                                v-model="editedEmployerInformation.status"
                                label="Status"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="px-12" text @click="closeEmployerForm"
                        >Cancel</v-btn
                    >
                    <v-btn class="px-12" @click="saveEmployer" color="primary"
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
            //Employer
            tableEmployers: [],
            formEmployerDialog: false,
            formEmployerListDialog: false,

            formEmployerErrors: {
                employer_no: null
            },

            tableEmployerHeaders: [
                { text: "ID", value: "id" },
                { text: "Name", value: "employer_no" },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "center"
                }
            ],

            editedEmployerIndex: -1,
            editedEmployerInformation: {
                employer_no: null
            },

            items: [
                { id: 0, name: "UNAVAILABLE" },
                { id: 1, name: "AVAILABLE" }
            ],

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
                contactRules: [
                    v => !!v || "Employer Number is required",
                    v =>
                        (!!v && v.length >= 10) ||
                        "Employer Number must be 11 characters",
                    v =>
                        (!!v && v.length < 11) ||
                        "Employer Number must not be more than 11 characters"
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
        formEmployerTitle() {
            return this.editedEmployerIndex === -1
                ? "New Employer"
                : "Edit Employer";
        }
    },

    mounted() {
        this.fetchEmployers();
    },

    methods: {
        //Employer
        fetchEmployers() {
            this.tableLoading = true;
            // this.componentOverlay = true;
            // axios
            //     .get("/api/v1/subscribers/" + this.profileId + "/employers")
            //     .then(response => {
            //         this.tableEmployers = response.data;
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            //     .finally(() => {
            //         this.componentOverlay = false;
            //         this.tableLoading = false;
            //     });
        },

        saveEmployer() {
            this.componentOverlay = true;
            if (this.editedEmployerIndex > -1) {
                this.updateEmployer();
            } else {
                this.createEmployer();
            }
        },

        createEmployer() {
            axios
                .post("/api/v1/subscribers/" + this.profileId + "/employers", {
                    ...this.editedEmployerInformation
                })
                .then(response => {
                    this.fetchEmployers();
                    this.closeEmployerForm();
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
                        this.formEmployerErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        editEmployer(contact) {
            this.editedEmployerIndex = this.tableEmployers.indexOf(contact);
            this.editedEmployerInformation = Object.assign({}, contact);
            this.formEmployerDialog = true;
        },

        updateEmployer() {
            axios
                .put("/api/v1/employers/" + this.editedEmployerInformation.id, {
                    ...this.editedEmployerInformation
                })
                .then(response => {
                    this.fetchEmployers();
                    this.closeEmployerForm();
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
                        this.formEmployerErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        deleteEmployer(employer) {
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
                            .delete("/api/v1/employers/" + employer.id)
                            .then(() => {
                                this.fetchEmployers();
                                this.closeEmployerForm();
                                swal.fire(
                                    "Deleted!",
                                    "Employer has been deleted.",
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

        closeEmployerForm() {
            this.formEmployerDialog = false;
            this.componentOverlay = false;
            this.deleteDialog = false;
            setTimeout(() => {
                this.formEmployerErrors = {
                    employer_no: null
                };
                this.editedEmployerInformation = Object.assign(
                    {},
                    this.defaultEmployerInformation
                );
                this.editedEmployerIndex = -1;
            }, 500);
        }
    }
};
</script>
