<template>
    <v-container fluid>
        <v-overlay :value="componentOverlay">
            <v-progress-circular
                :size="100"
                :width="5"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
        <v-row justify="center" wrap>
            <v-col cols="12" md="10">
                <v-tabs grow color="success" icons-and-text>
                    <v-tab>
                        Try
                        <v-icon>fab fa-telegram-plane</v-icon>
                    </v-tab>
                    <v-tab-item>
                        <v-form ref="sendFormSingle" lazy-validation>
                            <v-row justify="center" class="mt-5">
                                <v-col cols="12" md="7" class="mt-5">
                                    <v-card class="elevation-0 mt-5">
                                        <v-card-text>
                                            <v-row justify="space-between">
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        type="text"
                                                        v-model="
                                                            sms.phone_number
                                                        "
                                                        label="Recipient"
                                                        maxlength="11"
                                                        :rules="
                                                            rules.recipientRules
                                                        "
                                                    />
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-textarea
                                                        outlined
                                                        type="text"
                                                        counter
                                                        clearable
                                                        :rules="
                                                            rules.messageRules
                                                        "
                                                        clear-icon="mdi-close-circle"
                                                        maxlength="125"
                                                        v-model="sms.message"
                                                        ><template v-slot:label>
                                                            <div>
                                                                Message
                                                                <small
                                                                    >(Please
                                                                    limit your
                                                                    message to
                                                                    125
                                                                    characters)</small
                                                                >
                                                            </div>
                                                        </template></v-textarea
                                                    >
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                rounded
                                                x-large
                                                block
                                                color="success"
                                                class="mt-4"
                                                @click="sendSMS('single')"
                                            >
                                                <v-icon left>
                                                    fa-paper-plane
                                                </v-icon>
                                                Send SMS
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-tab-item>
                    <v-tab>
                        Blast
                        <v-icon>fas fa-sms</v-icon>
                    </v-tab>
                    <v-tab-item>
                        <v-form ref="sendFormBlast" lazy-validation>
                            <v-row justify="center" class="mt-5">
                                <v-col cols="12" md="7" class="mt-5">
                                    <v-card class="elevation-0 mt-5">
                                        <v-card-text>
                                            <v-row justify="space-between">
                                                <v-col cols="12">
                                                    <v-autocomplete
                                                        v-model="sms.group_ids"
                                                        :disabled="tableLoading"
                                                        :items="tableGroups"
                                                        chips
                                                        :rules="rules.required"
                                                        color="primary"
                                                        label="Select Group"
                                                        :search-input.sync="
                                                            searchInput
                                                        "
                                                        item-text="name"
                                                        item-value="id"
                                                        multiple
                                                        dense
                                                    >
                                                        <template
                                                            v-slot:selection="
                                                                data
                                                            "
                                                        >
                                                            <v-chip
                                                                v-bind="
                                                                    data.attrs
                                                                "
                                                                :input-value="
                                                                    data.selected
                                                                "
                                                                close
                                                                @click="
                                                                    data.select
                                                                "
                                                                @click:close="
                                                                    remove(
                                                                        data.item
                                                                    )
                                                                "
                                                            >
                                                                <!-- <v-avatar left>
                                                        <v-img :src="data.item.avatar"></v-img>
                                                    </v-avatar> -->
                                                                {{
                                                                    data.item
                                                                        .name
                                                                }}
                                                            </v-chip>
                                                        </template>
                                                        <template
                                                            v-slot:item="data"
                                                        >
                                                            <template
                                                                v-if="
                                                                    typeof data.item !==
                                                                        'object'
                                                                "
                                                            >
                                                                <v-list-item-content
                                                                    v-text="
                                                                        data.item
                                                                    "
                                                                ></v-list-item-content>
                                                            </template>
                                                            <template v-else>
                                                                <!-- <v-list-item-avatar>
                                                        <img :src="data.item.avatar">
                                                    </v-list-item-avatar> -->
                                                                <v-list-item-content>
                                                                    <v-list-item-title
                                                                        v-html="
                                                                            data
                                                                                .item
                                                                                .name
                                                                        "
                                                                    ></v-list-item-title>
                                                                    <!-- <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle> -->
                                                                </v-list-item-content>
                                                            </template>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-textarea
                                                        outlined
                                                        type="text"
                                                        counter
                                                        clearable
                                                        :rules="
                                                            rules.messageRules
                                                        "
                                                        clear-icon="mdi-close-circle"
                                                        maxlength="125"
                                                        v-model="sms.message"
                                                        ><template v-slot:label>
                                                            <div>
                                                                Message
                                                                <small
                                                                    >(Please
                                                                    limit your
                                                                    message to
                                                                    125
                                                                    characters)</small
                                                                >
                                                            </div>
                                                        </template></v-textarea
                                                    >
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                rounded
                                                x-large
                                                block
                                                color="success"
                                                class="mt-4"
                                                @click="sendSMS('blast')"
                                            >
                                                <v-icon left>
                                                    fa-paper-plane
                                                </v-icon>
                                                Send SMS
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            componentOverlay: false,
            profileId: sessionStorage.getItem("profile-id"),
            tableLoading: true,
            tableSearch: null,
            searchInput: "",
            rules: {
                //Form Field Rules
                required: [v => !!v || "Field is required"],
                messageRules: [
                    v => v.length <= 125 || "Max 125 characters",
                    v => !!v || "Field is required"
                ],
                recipientRules: [
                    v => v.length <= 11 || "Max 11 characters",
                    v => v.charAt(0) == 0 || "Invalid Format",
                    v => v.charAt(1) == 9 || "Invalid Format"
                ]
            },
            //Contact

            tableContacts: [],

            tableGroups: [],

            selectedGroup: [],

            sms: {
                group_ids: [],
                phone_number: "",
                message: ""
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
        }
    },

    mounted() {
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

        fetchGroups() {
            this.tableLoading = true;
            this.componentOverlay = true;
            axios
                .get("/api/v1/subscribers/" + this.profileId + "/groups")
                .then(response => {
                    this.tableGroups = response.data;
                    if (this.tableGroups[0])
                        this.sms.group_ids = [this.tableGroups[0].id];
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.componentOverlay = false;
                    this.tableLoading = false;
                });
        },

        sendSMS(type) {
            if (type == "single") {
                if (this.$refs.sendFormSingle.validate()) {
                    axios
                        .post("/api/v1/sms", {
                            ...this.sms
                        })
                        .then(response => {
                            this.tableContacts = response.data;
                            this.$refs.sendFormSingle.reset();
                            swal.fire({
                                type: "success",
                                icon: "success",
                                title: "Message Sent!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            this.sms = {
                                group_ids: [],
                                phone_number: "",
                                message: ""
                            };
                        });
                }
            } else if (type == "blast") {
                if (this.$refs.sendFormBlast.validate()) {
                    axios
                        .post("/api/v1/sms/broadcast/groups", {
                            ...this.sms
                        })
                        .then(response => {
                            this.tableContacts = response.data;
                            swal.fire({
                                type: "success",
                                icon: "success",
                                title: "Message Sent!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            this.sms = {
                                group_ids: [],
                                phone_number: "",
                                message: ""
                            };
                        });
                }
            }
        },

        remove(item) {
            const index = this.sms.group_ids.indexOf(item.id);
            if (index >= 0) this.sms.group_ids.splice(index, 1);
        }
    }
};
</script>
