<template>
    <v-container fluid>
        <v-overlay :value="componentOverlay">
            <v-progress-circular
                :size="100"
                :width="5"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
        <v-row justify-center wrap>
            <v-col md12>
                <v-tabs grow color="success" icons-and-text>
                    <v-tab>
                        Groups
                        <v-icon>mdi-account-group</v-icon>
                    </v-tab>
                    <v-tab-item>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-card class="elevation-9 ma-4">
                                    <v-container>
                                        <v-data-table
                                            :loading="tableLoading"
                                            loading-text="Fetching group list... Please wait"
                                            :single-select="true"
                                            v-model="selectedGroup"
                                            show-select
                                            :headers="tableGroupHeaders"
                                            :items="tableGroups"
                                            :search="tableSearch"
                                        >
                                            <template v-slot:top>
                                                <v-toolbar flat>
                                                    <v-toolbar-title
                                                        class="headline"
                                                        >Groups</v-toolbar-title
                                                    >
                                                    <div
                                                        class="flex-grow-1"
                                                    ></div>
                                                    <v-btn
                                                        small
                                                        @click="
                                                            formGroupDialog = true
                                                        "
                                                        color="primary"
                                                    >
                                                        <v-icon small left
                                                            >mdi-plus-circle</v-icon
                                                        >
                                                        Add Group
                                                    </v-btn>
                                                </v-toolbar>
                                            </template>
                                            <template v-slot:item.id="{ item }">
                                                {{
                                                    tableGroups
                                                        .map(function(x) {
                                                            return x.id;
                                                        })
                                                        .indexOf(item.id) + 1
                                                }}
                                            </template>
                                            <template
                                                v-slot:item.actions="{ item }"
                                            >
                                                <v-btn
                                                    icon
                                                    @click="editGroup(item)"
                                                >
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                                <v-btn
                                                    icon
                                                    @click="deleteGroup(item)"
                                                >
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </template>
                                        </v-data-table>
                                    </v-container>
                                </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-data-table
                                    :loading="tableLoading"
                                    loading-text="Fetching contacts list... Please wait"
                                    :headers="tableContactHeaders"
                                    :items="selectedGroupContacts"
                                    :search="tableSearch"
                                >
                                    <template v-slot:top>
                                        <v-toolbar flat>
                                            <v-toolbar-title class="headline"
                                                >Contacts in
                                                Group</v-toolbar-title
                                            >
                                            <div class="flex-grow-1"></div>
                                            <v-btn
                                                small
                                                @click="
                                                    formContactListDialog = true
                                                "
                                                color="primary"
                                                :disabled="
                                                    selectedGroup.length < 1
                                                "
                                            >
                                                <v-icon small left
                                                    >mdi-plus-circle</v-icon
                                                >
                                                Add Contact in Selected Group
                                            </v-btn>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:item.id="{ item }">
                                        {{
                                            selectedGroupContacts
                                                .map(function(x) {
                                                    return x.id;
                                                })
                                                .indexOf(item.id) + 1
                                        }}
                                    </template>
                                    <template v-slot:item.name="{ item }">
                                        {{ item.first_name }}
                                        {{ item.last_name }}
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-btn
                                            icon
                                            @click="removeContactGroup(item)"
                                        >
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <v-tab>
                        Contacts
                        <v-icon>mdi-account</v-icon>
                    </v-tab>
                    <v-tab-item>
                        <v-data-table
                            :loading="tableLoading"
                            loading-text="Fetching contacts list... Please wait"
                            :headers="tableContactHeaders"
                            :items="tableContacts"
                            :search="tableSearch"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title class="headline"
                                        >Contacts</v-toolbar-title
                                    >
                                    <div class="flex-grow-1"></div>
                                    <v-btn
                                        small
                                        @click="formUploadDialog = true"
                                        color="success"
                                    >
                                        <v-icon small left
                                            >mdi-cloud-upload</v-icon
                                        >
                                        Upload CSV
                                    </v-btn>
                                    <v-btn
                                        small
                                        @click="formContactDialog = true"
                                        color="primary"
                                    >
                                        <v-icon small left
                                            >mdi-plus-circle</v-icon
                                        >
                                        Add Contact
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.id="{ item }">
                                {{
                                    tableContacts
                                        .map(function(x) {
                                            return x.id;
                                        })
                                        .indexOf(item.id) + 1
                                }}
                            </template>
                            <template v-slot:item.name="{ item }">
                                {{ item.first_name }} {{ item.last_name }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn icon @click="editContact(item)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon @click="deleteContact(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
        <v-dialog v-model="formContactDialog" max-width="500px" persistent>
            <v-form ref="contactForm" lazy-validation>
                <v-card>
                    <v-overlay :value="componentOverlay">
                        <v-progress-circular
                            :size="100"
                            :width="5"
                            indeterminate
                        ></v-progress-circular>
                    </v-overlay>
                    <v-card-title class="headline">
                        {{ formContactTitle }}
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    type="text"
                                    :error-messages="
                                        formContactErrors.first_name
                                    "
                                    v-model="
                                        editedContactInformation.first_name
                                    "
                                    label="First Name"
                                    :rules="rules.required"
                                />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    type="text"
                                    :error-messages="
                                        formContactErrors.last_name
                                    "
                                    v-model="editedContactInformation.last_name"
                                    label="Last Name"
                                    :rules="rules.required"
                                />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    type="phone"
                                    :error-messages="
                                        formContactErrors.phone_number
                                    "
                                    v-model="
                                        editedContactInformation.phone_number
                                    "
                                    maxlength="11"
                                    label="Phone Number"
                                    :rules="rules.recipientRules"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="px-12" text @click="closeContactForm"
                            >Cancel</v-btn
                        >
                        <v-btn
                            class="px-12"
                            @click="saveContact"
                            color="primary"
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <v-dialog v-model="formGroupDialog" max-width="500px" persistent>
            <v-card>
                <v-overlay :value="componentOverlay">
                    <v-progress-circular
                        :size="100"
                        :width="5"
                        indeterminate
                    ></v-progress-circular>
                </v-overlay>
                <v-card-title class="headline">
                    {{ formGroupTitle }}
                </v-card-title>
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="text"
                                :error-messages="formGroupErrors.name"
                                v-model="editedGroupInformation.name"
                                label="Name"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="px-12" text @click="closeGroupForm"
                        >Cancel</v-btn
                    >
                    <v-btn class="px-12" @click="saveGroup" color="primary"
                        >Save</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="formUploadDialog" max-width="500px" persistent>
            <v-card>
                <v-overlay :value="componentOverlay">
                    <v-progress-circular
                        :size="100"
                        :width="5"
                        indeterminate
                    ></v-progress-circular>
                </v-overlay>
                <v-card-title class="headline"> Upload CSV Files </v-card-title>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <form
                                @submit="formSubmit"
                                enctype="multipart/form-data"
                            >
                                <strong>File:</strong>

                                <input
                                    type="file"
                                    class="form-control"
                                    v-on:change="onFileChange"
                                />

                                <button class="btn btn-success">Submit</button>
                            </form>
                            <!-- <v-form enctype="multipart/form-data">
                                <v-file-input
                                    v-model="csv"
                                    counter
                                    label="File input"
                                    multiple
                                    placeholder="Select your file"
                                    prepend-icon="mdi-paperclip"
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    outlined
                                    :show-size="1000"
                                >
                                    <template
                                        v-slot:selection="{ index, text }"
                                    >
                                        <v-chip
                                            v-if="index < 2"
                                            color="primary"
                                            dark
                                            label
                                            small
                                        >
                                            {{ text }}
                                        </v-chip>

                                        <span
                                            v-else-if="index === 2"
                                            class="text-overline grey--text text--darken-3 mx-2"
                                        >
                                            +{{ files.length - 2 }} File(s)
                                        </span>
                                    </template>
                                </v-file-input>
                            </v-form> -->
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="px-12" text @click="formUploadDialog = false"
                        >Cancel</v-btn
                    >
                    <v-btn class="px-12" @click="uploadCsv()" color="primary"
                        >Upload</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="formContactListDialog" max-width="500px" persistent>
            <v-card>
                <v-overlay :value="componentOverlay">
                    <v-progress-circular
                        :size="100"
                        :width="5"
                        indeterminate
                    ></v-progress-circular>
                </v-overlay>
                <v-card-title class="headline">
                    Insert Contact in Group
                </v-card-title>
                <v-card-text>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-autocomplete
                                v-model="selectedContacts"
                                rounded
                                :items="filteredContacts"
                                filled
                                chips
                                color="primary"
                                label="Select Contact"
                                item-text="fist_name"
                                :search-input.sync="searchInput"
                                item-value="id"
                                multiple
                                dense
                            >
                                <template v-slot:selection="data">
                                    <v-chip
                                        v-bind="data.attrs"
                                        :input-value="data.selected"
                                        close
                                        @click="data.select"
                                        @click:close="remove(data.item)"
                                    >
                                        {{ data.item.first_name }}
                                        {{ data.item.last_name }}
                                    </v-chip>
                                </template>
                                <template v-slot:item="data">
                                    <template
                                        v-if="typeof data.item !== 'object'"
                                    >
                                        <v-list-item-content
                                            v-text="data.item"
                                        ></v-list-item-content>
                                    </template>
                                    <template v-else>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-html="data.item.first_name"
                                            ></v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="px-12" text @click="closeContactListDialog"
                        >Cancel</v-btn
                    >
                    <v-btn
                        class="px-12"
                        @click="insertContactGroup()"
                        color="primary"
                        >Insert</v-btn
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
            file: null,
            componentOverlay: false,
            profileId: sessionStorage.getItem("profile-id"),
            tableLoading: true,
            tableSearch: null,
            searchInput: "",
            //Contact
            formContactDialog: false,
            formUploadDialog: false,

            formContactErrors: {
                first_name: null,
                last_name: null,
                phone_number: null
            },

            tableContactHeaders: [
                { text: "ID", value: "id" },
                { text: "Name", value: "name" },
                { text: "Contact Number", value: "phone_number" },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "center"
                }
            ],

            tableContacts: [],

            csv: null,

            editedContactIndex: -1,
            defaultContactInformation: {
                first_name: null,
                last_name: null,
                phone_number: ""
            },
            editedContactInformation: {
                first_name: null,
                last_name: null,
                phone_number: ""
            },
            //Group
            formGroupDialog: false,
            formContactListDialog: false,

            formGroupErrors: {
                name: null
            },

            tableGroupHeaders: [
                { text: "ID", value: "id" },
                { text: "Name", value: "name" },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "center"
                }
            ],

            tableGroups: [],
            selectedGroup: [],
            selectedGroupContacts: [],
            selectedContacts: [],

            editedGroupIndex: -1,
            defaultGroupInformation: {
                name: null,
                contacts: []
            },
            editedGroupInformation: {
                name: null,
                contacts: []
            },
            rules: {
                //Form Field Rules
                required: [v => !!v || "Field is required"],
                messageRules: [v => v.length <= 127 || "Max 127 characters"],
                recipientRules: [
                    v => v.length <= 11 || "Max 11 characters",
                    v => v.charAt(0) == 0 || "Invalid Format",
                    v => v.charAt(1) == 9 || "Invalid Format"
                ]
            }
        };
    },

    computed: {
        formContactTitle() {
            return this.editedContactIndex === -1
                ? "New Contact"
                : "Edit Contact";
        },

        formGroupTitle() {
            return this.editedGroupIndex === -1 ? "New Group" : "Edit Group";
        },

        filteredContacts() {
            let filtered = this.tableContacts.filter(
                elem =>
                    !this.selectedGroupContacts.find(({ id }) => elem.id === id)
            );
            return filtered;
        }
    },

    watch: {
        selectedGroup() {
            if (this.selectedGroup[0]) {
                this.selectedGroupContacts = this.selectedGroup[0].contacts;
            } else {
                this.selectedGroupContacts = [];
            }
        }
    },

    mounted() {
        this.fetchContacts();
        this.fetchGroups();
    },

    methods: {
        //Contacts
        fetchContacts() {
            this.tableLoading = true;
            this.componentOverlay = true;
            axios
                .get("/api/v1/subscribers/" + this.profileId + "/contacts")
                .then(response => {
                    this.tableContacts = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.componentOverlay = false;
                    this.tableLoading = false;
                });
        },

        saveContact() {
            if (this.$refs.contactForm.validate()) {
                this.componentOverlay = true;
                if (this.editedContactIndex > -1) {
                    this.updateContact();
                } else {
                    this.createContact();
                }
            }
        },

        createContact() {
            axios
                .post("/api/v1/subscribers/" + this.profileId + "/contacts", {
                    ...this.editedContactInformation
                })
                .then(response => {
                    this.fetchContacts();
                    // this.editedContactInformation = response.data.contact
                    // this.editedContactInformation.user = response.data.user
                    // this.tableContacts.push(this.editedContactInformation)
                    this.closeContactForm();
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
                        this.formContactErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        editContact(contact) {
            this.editedContactIndex = this.tableContacts.indexOf(contact);
            this.editedContactInformation = Object.assign({}, contact);
            this.formContactDialog = true;
        },

        updateContact() {
            axios
                .put("/api/v1/contacts/" + this.editedContactInformation.id, {
                    ...this.editedContactInformation
                })
                .then(response => {
                    this.fetchContacts();
                    // this.editedContactInformation = response.data.contact
                    // this.editedContactInformation.user = response.data.user
                    // Object.assign(this.tableContacts[this.editedContactIndex], this.editedContactInformation)
                    this.closeContactForm();
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
                        this.formContactErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        onFileChange(e) {
            console.log(e.target.files[0]);

            this.file = e.target.files[0];
        },

        formSubmit(e) {
            e.preventDefault();

            let currentObj = this;

            const config = {
                headers: { "content-type": "multipart/form-data" }
            };

            let formData = new FormData();

            formData.append("file", this.file);

            axios
                .post("/api/v1/upload/csv", formData, config)

                .then(function(response) {
                    currentObj.success = response.data.success;
                })

                .catch(function(error) {
                    currentObj.output = error;
                });
        },

        uploadCsv() {
            let formData = new FormData();

            formData.append("file", this.csv[0]);

            //formData.append(
            //    "file",
            //    fs.createReadStream("‪C:/Users/Aeiou/Documents/Sample Csv.xlsx")
            //);
            console.log(formData);

            const config = {
                headers: { "content-type": "multipart/form-data" }
            };

            axios
                .post("/api/v1/upload/csv", formData, config)
                .then(response => {
                    this.fetchContacts();
                    this.formUploadDialog = false;
                    this.csv = null;
                    swal.fire({
                        position: "top-end",
                        toast: true,
                        type: "success",
                        icon: "success",
                        text: "Successfully Upload",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    this.componentOverlay = false;

                    if (error.response.status == 422) {
                        this.formContactErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        deleteContact(contact) {
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
                            .delete("/api/v1/contacts/" + contact.id)
                            .then(() => {
                                this.fetchContacts();
                                this.closeContactForm();
                                swal.fire(
                                    "Deleted!",
                                    "Contact has been deleted.",
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
                                    this.$router.push("/signin");
                                }
                                return;
                            });
                    }
                })
                .catch(() => {
                    swal("Failed!", "There was something wrong.", "warning");
                });
        },

        closeContactForm() {
            this.formContactDialog = false;
            this.componentOverlay = false;
            this.deleteDialog = false;
            setTimeout(() => {
                this.formContactErrors = {
                    first_name: null,
                    last_name: null,
                    phone_number: null
                };
                this.editedContactInformation = Object.assign(
                    {},
                    this.defaultContactInformation
                );
                this.editedContactIndex = -1;
            }, 500);
        },

        //Group
        fetchGroups() {
            this.tableLoading = true;
            this.componentOverlay = true;
            axios
                .get("/api/v1/subscribers/" + this.profileId + "/groups")
                .then(response => {
                    this.tableGroups = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.componentOverlay = false;
                    this.tableLoading = false;
                });
        },

        saveGroup() {
            this.componentOverlay = true;
            if (this.editedGroupIndex > -1) {
                this.updateGroup();
            } else {
                this.createGroup();
            }
        },

        createGroup() {
            axios
                .post("/api/v1/subscribers/" + this.profileId + "/groups", {
                    ...this.editedGroupInformation
                })
                .then(response => {
                    this.fetchGroups();
                    // this.editedGroupInformation = response.data.contact
                    // this.editedGroupInformation.user = response.data.user
                    // this.tableGroups.push(this.editedGroupInformation)
                    this.closeGroupForm();
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
                        this.formGroupErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        editGroup(contact) {
            this.editedGroupIndex = this.tableGroups.indexOf(contact);
            this.editedGroupInformation = Object.assign({}, contact);
            this.formGroupDialog = true;
        },

        updateGroup() {
            axios
                .put("/api/v1/groups/" + this.editedGroupInformation.id, {
                    ...this.editedGroupInformation
                })
                .then(response => {
                    this.fetchGroups();
                    // this.editedGroupInformation = response.data.contact
                    // this.editedGroupInformation.user = response.data.user
                    // Object.assign(this.tableGroups[this.editedGroupIndex], this.editedGroupInformation)
                    this.closeGroupForm();
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
                        this.formGroupErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        deleteGroup(group) {
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
                            .delete("/api/v1/groups/" + group.id)
                            .then(() => {
                                this.fetchGroups();
                                this.closeGroupForm();
                                swal.fire(
                                    "Deleted!",
                                    "Group has been deleted.",
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
                                    this.$router.push("/signin");
                                }
                                return;
                            });
                    }
                })
                .catch(() => {
                    swal("Failed!", "There was something wrong.", "warning");
                });
        },

        closeGroupForm() {
            this.formGroupDialog = false;
            this.componentOverlay = false;
            this.deleteDialog = false;
            setTimeout(() => {
                this.formGroupErrors = {
                    name: null
                };
                this.editedGroupInformation = Object.assign(
                    {},
                    this.defaultGroupInformation
                );
                this.editedGroupIndex = -1;
            }, 500);
        },

        closeContactListDialog() {
            this.formContactListDialog = false;
            this.componentOverlay = false;
            setTimeout(() => {
                this.selectedContacts = [];
            }, 500);
        },

        remove(item) {
            const index = this.selectedContacts.indexOf(item.id);
            if (index >= 0) this.selectedContacts.splice(index, 1);
        },

        insertContactGroup() {
            axios
                .put(
                    "/api/v1/groups/" +
                        this.selectedGroup[0].id +
                        "/contacts/add",
                    {
                        contacts: this.selectedContacts
                    }
                )
                .then(response => {
                    axios
                        .get("/api/v1/groups/" + this.selectedGroup[0].id)
                        .then(response => {
                            this.selectedGroupContacts = response.data.contacts;
                        });
                    this.closeContactListDialog();
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
                        this.formGroupErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        },

        removeContactGroup(item) {
            let contacts = [item.id];
            axios
                .put(
                    "/api/v1/groups/" +
                        this.selectedGroup[0].id +
                        "/contacts/remove",
                    {
                        contacts: contacts
                    }
                )
                .then(response => {
                    axios
                        .get("/api/v1/groups/" + this.selectedGroup[0].id)
                        .then(response => {
                            this.selectedGroupContacts = response.data.contacts;
                        });
                    this.closeContactListDialog();
                    this.fetchGroups();
                    swal.fire({
                        position: "top-end",
                        toast: true,
                        type: "success",
                        icon: "success",
                        text: "Successfully Removed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    this.componentOverlay = false;

                    if (error.response.status == 422) {
                        this.formGroupErrors = error.response.data.errors;
                    } else {
                        console.log(error);
                    }
                })
                .finally(() => {});
        }
    }
};
</script>
