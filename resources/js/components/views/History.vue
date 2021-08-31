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
                            loading-text="Fetching histories list... Please wait"
                            :headers="tableHistoryHeaders"
                            :items="histories"
                            :search="tableSearch"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title class="headline"
                                        >Purchase Histories</v-toolbar-title
                                    >
                                    <div class="flex-grow-1"></div>
                                    <v-btn
                                        small
                                        :disabled="subscriber_plan.id == 1"
                                        @click="openCreditDialog()"
                                        color="primary"
                                    >
                                        <v-icon small left
                                            >mdi-cart-variant</v-icon
                                        >
                                        Buy Credit
                                    </v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.id="{ item }">
                                {{
                                    histories
                                        .map(function(x) {
                                            return x.id;
                                        })
                                        .indexOf(item.id) + 1
                                }}
                            </template>
                            <template v-slot:item.amount="{ item }">
                                ₱
                                {{ formattedAmount(item.amount) }}
                            </template>
                            <template v-slot:item.status="{ item }">
                                <v-chip
                                    class="white--text"
                                    :color="statusColor(item.status)"
                                >
                                    {{ item.status }}
                                </v-chip>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="formCreditDialog" max-width="500px" persistent>
            <v-form ref="creditForm" lazy-validation>
                <v-card>
                    <v-toolbar elevation="0" color="success">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline white--text">
                            Buy Credit
                        </v-card-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-row justify="center">
                            <v-col cols="12" md="6">
                                <v-select
                                    type="number"
                                    v-model="credit"
                                    :items="selections"
                                    label="Please Select Amount"
                                    :rules="rules.required"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="px-12"
                            text
                            @click="formCreditDialog = false"
                            >Cancel</v-btn
                        >
                        <v-btn
                            :disabled="!credit"
                            class="px-12"
                            @click="paymentInstructionDialog = true"
                            color="primary"
                            >Buy</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <v-dialog
            v-model="paymentInstructionDialog"
            max-width="800px"
            persistent
        >
            <v-card>
                <v-toolbar elevation="0" color="success">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="paymentInstructionDialog = false"
                        ><v-icon color="white">mdi-close</v-icon></v-btn
                    >
                </v-toolbar>
                <v-card-text>
                    <v-row
                        v-if="credit"
                        justify="center"
                        class="payment-instruction mt-3"
                    >
                        <v-col cols="12" md="5" class="text-center">
                            <p>
                                <strong>Your Transaction</strong><br />Please
                                verify the informations below:
                            </p>
                            <img width="100px" src="img/logo.png" alt="" />
                            <v-row>
                                <v-col class="text-left">
                                    Biller <br />
                                    Amount<br />
                                    Convinience Fee <br />
                                    Total Amount <br />
                                    Status <br />
                                </v-col>
                                <v-col class="text-right">
                                    <strong class="black--text">SMSOn </strong
                                    ><br />
                                    <strong class="black--text"
                                        >₱ {{ credit }}</strong
                                    ><br />
                                    <strong class="black--text">₱ 0 </strong
                                    ><br />
                                    <strong class="error--text"
                                        >₱ {{ credit }} </strong
                                    ><br />
                                    <v-chip color="primary">Initial</v-chip>
                                    <br
                                /></v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="7" class="text-center">
                            <p>
                                <strong>Payment Method</strong><br />All
                                transactions are secured and encrypted.
                            </p>
                            <strong>Select Payment Method</strong>
                            <v-row class="mt-3">
                                <v-col>
                                    <v-hover v-slot="{ hover }">
                                        <v-card @click="paymentMethod = 'Bank'">
                                            <v-card-text
                                                class="text-center align-center"
                                            >
                                                <v-icon
                                                    :color="
                                                        hover
                                                            ? 'primary'
                                                            : '' ||
                                                              paymentMethod ==
                                                                  'Bank'
                                                            ? 'primary'
                                                            : ''
                                                    "
                                                    >mdi-bank</v-icon
                                                >
                                                <strong
                                                    :class="
                                                        hover
                                                            ? 'primary--text'
                                                            : '' ||
                                                              paymentMethod ==
                                                                  'Bank'
                                                            ? 'primary--text'
                                                            : ''
                                                    "
                                                    >Bank</strong
                                                >
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                                <v-col>
                                    <v-hover v-slot="{ hover }">
                                        <v-card
                                            @click="
                                                paymentMethod = 'Mobile Banking'
                                            "
                                        >
                                            <v-card-text
                                                class="text-center align-center"
                                            >
                                                <v-icon
                                                    :color="
                                                        hover
                                                            ? 'success'
                                                            : '' ||
                                                              paymentMethod ==
                                                                  'Mobile Banking'
                                                            ? 'success'
                                                            : ''
                                                    "
                                                    >mdi-cellphone</v-icon
                                                >
                                                <strong
                                                    :class="
                                                        hover
                                                            ? 'success--text'
                                                            : '' ||
                                                              paymentMethod ==
                                                                  'Mobile Banking'
                                                            ? 'success--text'
                                                            : ''
                                                    "
                                                    >Mobile Banking</strong
                                                >
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn
                                        :disabled="!paymentMethod"
                                        block
                                        rounded
                                        color="success"
                                        large
                                        @click="proceedPayment()"
                                        >PROCEED</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row
                        v-else
                        justify="center"
                        class="payment-instruction mt-3"
                    >
                        <v-col cols="12" md="5" class="text-center">
                            <p>
                                Selected payment option: <br />
                                <strong class="primary--text">UnionBank</strong>
                            </p>
                            <h6>{{ paymentDetails.reference_code }}</h6>
                            <img width="100px" src="img/logo.png" alt="" />
                            <v-row>
                                <v-col class="text-left">
                                    Biller <br />
                                    Amount<br />
                                    Convinience Fee <br />
                                    Total Amount <br />
                                    Status <br />
                                </v-col>
                                <v-col class="text-right">
                                    <strong class="black--text">SMSOn </strong
                                    ><br />
                                    <strong class="black--text"
                                        >₱
                                        {{
                                            formattedAmount(
                                                paymentDetails.amount
                                            )
                                        }}</strong
                                    ><br />
                                    <strong class="black--text">₱ 0 </strong
                                    ><br />
                                    <strong class="error--text"
                                        >₱
                                        {{
                                            formattedAmount(
                                                paymentDetails.amount
                                            )
                                        }} </strong
                                    ><br />
                                    <v-chip color="primary">{{
                                        paymentDetails.status
                                    }}</v-chip>
                                    <br
                                /></v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="7" class="text-left">
                            <p v-if="paymentMethod == 'Bank'">
                                To complete your transaction. kindly go to the
                                nearest<br />
                                <strong class="primary--text"
                                    >UnionBank Branch</strong
                                >
                                and fill out the information below:<br />
                                <br />
                                Account Name:
                                <strong class="black--text"
                                    >Dreame rs IT Solution Inc</strong
                                ><br />
                                Account Number:
                                <strong class="black--text">002850005624</strong
                                ><br />
                                Reference Code:
                                <strong class="black--text">{{
                                    paymentDetails.reference_code
                                }}</strong
                                ><br />
                                <br />
                                Your payment will be verified within 2 working
                                days
                            </p>
                            <p v-else>
                                Login to
                                <strong class="primary--text"
                                    >UnionBank Online</strong
                                >
                                and select
                                <strong class="black--text"
                                    >To Other UnionBank Account</strong
                                >
                                then enter the following receiver information
                                below:<br />
                                <br />
                                Account Name:
                                <strong class="black--text"
                                    >Dreame rs IT Solution Inc</strong
                                ><br />
                                Account Number:
                                <strong class="black--text">002850005624</strong
                                ><br />
                                Reference Code:
                                <strong class="black--text">{{
                                    paymentDetails.reference_code
                                }}</strong
                                ><br />
                                <br />
                                Your payment will be verified within 2 working
                                days
                            </p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            //Table Variables
            tableHistoryHeaders: [
                {
                    text: "Id",
                    value: "id",
                    class: "table-header"
                },
                {
                    text: "Code",
                    value: "reference_code",
                    class: "table-header"
                },
                {
                    text: "Amount",
                    value: "amount",
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
            selections: ["500", "1,000", "2,500", "5,000", "10,000"],
            credit: 0,
            profileId: sessionStorage.getItem("profile-id"),
            histories: [{}],
            paymentMethod: "",
            subscriber_plan: { id: 1 },
            paymentDetails: {
                reference_code: "",
                status: "",
                amount: ""
            },
            rules: {
                //Form Field Rules
                required: [v => !!v || "Field is required"]
            },

            formCreditDialog: false,
            paymentInstructionDialog: false
        };
    },

    mounted() {
        this.fetchHistories();
        this.fetchDashboard();
    },

    methods: {
        fetchHistories() {
            this.tableLoading = true;
            axios
                .get(
                    "/api/v1/subscribers/" +
                        this.profileId +
                        "/purchase-histories"
                )
                .then(response => {
                    this.histories = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.tableLoading = false;
                    this.componentOverlay = false;
                });
        },

        fetchDashboard() {
            axios
                .get("/api/v1/dashboard")
                .then(response => {
                    this.subscriber_plan = response.data.plan;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.componentOverlay = false;
                });
        },

        buyCredit() {
            axios
                .post(
                    "/api/v1/subscribers/" +
                        this.profileId +
                        "/purchase-histories",
                    {
                        amount: this.credit
                    }
                )
                .then(response => {
                    this.tableContacts = response.data;
                    swal.fire({
                        type: "success",
                        icon: "success",
                        title: "Purchase Request Sent!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.fetchHistories();
                    this.formCreditDialog = false;
                    this.credit = 0;
                });
        },

        openCreditDialog() {
            this.credit = 0;
            this.formCreditDialog = true;
        },

        proceedPayment() {
            console.log(this.paymentMethod);
            axios
                .post(
                    "/api/v1/subscribers/" +
                        this.profileId +
                        "/purchase-histories",
                    {
                        amount: parseFloat(this.credit.replace(/,/g, ""))
                    }
                )
                .then(response => {
                    this.paymentDetails = response.data;

                    swal.fire({
                        position: "top-end",
                        toast: true,
                        type: "success",
                        icon: "success",
                        text: "Purchase Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.fetchHistories();
                    this.formCreditDialog = false;
                    this.credit = 0;
                });
        },

        formattedAmount(number) {
            let internationalNumberFormat = new Intl.NumberFormat("en-US");
            return internationalNumberFormat.format(number);
        },

        statusColor(status) {
            if (status == "COMPLETED") {
                return "success";
            } else if (status == "PENDING") {
                return "primary";
            } else if (status == "CANCELLED" || status == "DECLINED") {
                return "error";
            }
        }
    }
};
</script>
