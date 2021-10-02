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
                            loading-text="Fetching employee list... Please wait"
                            :headers="tableEmployeeHeaders"
                            :items="tableEmployees"
                            :search="tableSearch"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title class="headline"
                                        >Employees</v-toolbar-title
                                    >
                                    <div class="flex-grow-1"></div>
                                    <v-btn
                                        small
                                        @click="formEmployeeDialog = true"
                                        color="primary"
                                    >
                                        <v-icon small left
                                            >mdi-plus-circle</v-icon
                                        >
                                        Add Employee
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.id="{ item }">
                                {{
                                    tableEmployees
                                        .map(function(x) {
                                            return x.id;
                                        })
                                        .indexOf(item.id) + 1
                                }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn icon @click="editEmployee(item)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon @click="deleteEmployee(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="formEmployeeDialog" max-width="500px" persistent>
            <v-card>
                <v-overlay :value="componentOverlay">
                    <v-progress-circular
                        :size="100"
                        :width="5"
                        indeterminate
                    ></v-progress-circular>
                </v-overlay>
                <v-card-title class="headline">
                    {{ formEmployeeTitle }}
                </v-card-title>
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="text"
                                :error-messages="formEmployeeErrors.employee_no"
                                v-model="editedEmployeeInformation.employee_no"
                                label="Employee Number"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="items"
                                item-value="id"
                                item-text="name"
                                type="text"
                                :error-messages="formEmployeeErrors.status"
                                v-model="editedEmployeeInformation.status"
                                label="Status"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="px-12" text @click="closeEmployeeForm"
                        >Cancel</v-btn
                    >
                    <v-btn class="px-12" @click="saveEmployee" color="primary"
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
            //Employee
            tableEmployees: [],
            formEmployeeDialog: false,
            formEmployeeListDialog: false,

            formEmployeeErrors: {
                employee_no: null
            },

            tableEmployeeHeaders: [
                { text: "ID", value: "id" },
                { text: "Name", value: "employee_no" },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "center"
                }
            ],

            editedEmployeeIndex: -1,
            editedEmployeeInformation: {
                employee_no: null
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
                    v => !!v || "Employee Number is required",
                    v =>
                        (!!v && v.length >= 10) ||
                        "Employee Number must be 11 characters",
                    v =>
                        (!!v && v.length < 11) ||
                        "Employee Number must not be more than 11 characters"
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
        formEmployeeTitle() {
            return this.editedEmployeeIndex === -1
                ? "New Employee"
                : "Edit Employee";
        }
    },

    mounted() {
        this.fetchEmployees();
    },

    methods: {
        //Employee
        fetchEmployees() {
            this.tableLoading = true;
            // this.componentOverlay = true;
            // axios
            //     .get("/api/v1/subscribers/" + this.profileId + "/employees")
            //     .then(response => {
            //         this.tableEmployees = response.data;
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
            //     .finally(() => {
            //         this.componentOverlay = false;
            //         this.tableLoading = false;
            //     });
        },

        saveEmployee() {
            this.componentOverlay = true;
            if (this.editedEmployeeIndex > -1) {
                this.updateEmployee();
            } else {
                this.createEmployee();
            }
        },

        createEmployee() {
            axios
                .post("/api/v1/subscribers/" + this.profileId + "/employees", {
                    ...this.editedEmployeeInformation
                })
                .then(response => {
                    this.fetchEmployees();
                    this.closeEmployeeForm();
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
                        this.formEmployeeErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        editEmployee(contact) {
            this.editedEmployeeIndex = this.tableEmployees.indexOf(contact);
            this.editedEmployeeInformation = Object.assign({}, contact);
            this.formEmployeeDialog = true;
        },

        updateEmployee() {
            axios
                .put("/api/v1/employees/" + this.editedEmployeeInformation.id, {
                    ...this.editedEmployeeInformation
                })
                .then(response => {
                    this.fetchEmployees();
                    this.closeEmployeeForm();
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
                        this.formEmployeeErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        deleteEmployee(employee) {
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
                            .delete("/api/v1/employees/" + employee.id)
                            .then(() => {
                                this.fetchEmployees();
                                this.closeEmployeeForm();
                                swal.fire(
                                    "Deleted!",
                                    "Employee has been deleted.",
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

        closeEmployeeForm() {
            this.formEmployeeDialog = false;
            this.componentOverlay = false;
            this.deleteDialog = false;
            setTimeout(() => {
                this.formEmployeeErrors = {
                    employee_no: null
                };
                this.editedEmployeeInformation = Object.assign(
                    {},
                    this.defaultEmployeeInformation
                );
                this.editedEmployeeIndex = -1;
            }, 500);
        }
    }
};
</script>
