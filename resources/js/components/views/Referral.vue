<template>
    <v-container fill-height fluid grid-list-xl>
        <v-overlay :value="componentOverlay">
            <v-progress-circular
                :size="100"
                :width="5"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
        <v-row justify="center" wrap align="center">
            <v-col cols="12" md="10">
                <v-card class="elevation-9 ma-4">
                    <v-container>
                        <v-data-table
                            :loading="tableLoading"
                            loading-text="Fetching referrals list... Please wait"
                            :headers="tableReferralHeaders"
                            :items="referrals"
                            :search="tableSearch"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title class="headline"
                                        >Referrals</v-toolbar-title
                                    >
                                    <div class="flex-grow-1"></div>
                                    <p>
                                        Referral Code:<strong>{{
                                            profile.referral_code
                                        }}</strong>
                                    </p>
                                    <v-btn
                                        class="mb-6"
                                        icon
                                        @click="copyToClipboard()"
                                    >
                                        <v-icon>mdi-content-copy</v-icon>
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.id="{ item }">
                                {{
                                    referrals
                                        .map(function(x) {
                                            return x.id;
                                        })
                                        .indexOf(item.id) + 1
                                }}
                            </template>
                            <template v-slot:item.name="{ item }">
                                {{ item.referee.first_name }}
                                {{ item.referee.last_name }}
                            </template>
                            <template v-slot:item.status="{ item }">
                                <v-chip
                                    class="white--text"
                                    color="success"
                                    v-if="item.referee.is_active"
                                    >ACTIVE
                                </v-chip>
                                <v-chip class="white--text" color="error" v-else
                                    >INACTIVE
                                </v-chip>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            //Table Variables
            tableReferralHeaders: [
                {
                    text: "Id",
                    value: "id",
                    class: "table-header"
                },
                {
                    text: "Name",
                    value: "name",
                    class: "table-header"
                },
                {
                    text: "Status",
                    value: "status",
                    class: "table-header"
                }
            ],
            tableLoading: false,
            tableSearch: null,
            componentOverlay: false,
            referrals: [],
            profile: "",
            profileId: sessionStorage.getItem("profile-id")
        };
    },

    mounted() {
        this.fetchReferrals();
        this.fetchProfile();
    },

    methods: {
        fetchReferrals() {
            this.tableLoading = true;
            axios
                .get("/api/v1/subscribers/" + this.profileId + "/referrals")
                .then(response => {
                    this.referrals = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.tableLoading = false;
                    this.componentOverlay = false;
                });
        },

        fetchProfile() {
            this.tableLoading = true;
            axios
                .get("/api/v1/subscribers/" + this.profileId)
                .then(response => {
                    this.profile = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.tableLoading = false;
                    this.componentOverlay = false;
                });
        },

        copyToClipboard() {
            var textArea = document.createElement("textarea");

            textArea.value = this.profile.referral_code;

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand("copy");

            document.body.removeChild(textArea);
        }
    }
};
</script>
