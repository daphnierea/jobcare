<template>
    <v-container fill-height fluid grid-list-xl>
        <v-row>
            <v-col cols="12" md="8" class="dashboard-stats">
                <v-row class="mt-4">
                    <v-col>
                        <h1>Dashboard</h1>
                        <p class="font-weight-thin body-2">Welcome Back!</p>
                        <h4 class="mt-4">Quick Stats</h4>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn rounded color="success" to="/blast">
                            <v-icon left>
                                fa-paper-plane
                            </v-icon>
                            Send SMS
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        sm="6"
                        xs="12"
                        md="6"
                        lg="6"
                        xl="3"
                        v-for="(stat, index) in stats"
                        :key="index"
                    >
                        <material-stats-card
                            :color="stat.color"
                            :icon="stat.icon"
                            :title="stat.title"
                            :value="stat.value"
                            :small-value="stat.smallvalue"
                            :sub-icon="stat.subicon"
                            :sub-icon-color="stat.subiconcolor"
                            :sub-text="stat.subtext"
                            :sub-text-color="stat.subtextcolor"
                        />
                    </v-col>
                </v-row>
                <!-- <v-row>
                    <v-col
                        md12
                        sm12
                        lg4
                        v-for="(chart, index) in charts"
                        :key="index"
                    >
                        <material-chart-card
                            :data="chart.data"
                            :options="chart.options"
                            :color="chart.design.color"
                            :type="chart.design.type"
                            :responsive-options="chart.responsiveOptions"
                        >
                            <h4 class="title font-weight-light">
                                {{ chart.label.title }}
                            </h4>
                            <p class="category d-inline-flex font-weight-light">
                                {{ chart.label.subtitle }}
                            </p>

                            <template slot="actions">
                                <v-icon class="mr-2" small>
                                    mdi-clock-outline
                                </v-icon>
                                <span
                                    class="caption grey--text font-weight-light"
                                    >{{ chart.label.time }}</span
                                >
                            </template>
                        </material-chart-card>
                    </v-col>
                </v-row> -->
            </v-col>
            <v-col cols="12" md="4" class="mt-4">
                <v-row>
                    <v-col cols="12" md="6" xl="8" class="dashboard-profile">
                        <p class="font-weight-bold dashboard-profile-name">
                            {{ subscriber.details.first_name }}
                            {{ subscriber.details.last_name }}
                        </p>
                        <p class="dashboard-profile-account">
                            {{ subscriber.plan.name }}
                        </p>
                        <p class="dashboard-profile-balance">
                            {{
                                formattedAmount(
                                    subscriber.subscriber_plan.credits
                                )
                            }}
                            PHP
                        </p>
                        <p class="dashboard-profile-remaining">
                            <b>{{ subscriber.subscriber_plan.rate }} per sms</b
                            >({{ subscriber.subscriber_plan.available }}
                            sms remaining)
                        </p>
                    </v-col>
                    <v-col cols="12" md="6" xl="4">
                        <v-avatar class="mx-auto d-block" :size="avatarSize">
                            <img src="img/avatar.png" />
                        </v-avatar>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            :disabled="subscriber.plan.id == 1"
                            x-large
                            block
                            rounded
                            color="green"
                            class="white--text"
                            @click="formCreditDialog = true"
                            >BUY CREDIT</v-btn
                        >
                    </v-col>
                    <v-col cols="12">
                        <v-card
                            class="rounded-xl upgrade-card bg-gradient-primary-to-secondary"
                            @click="planDialog = true"
                        >
                            <div
                                class="d-flex flex-no-wrap justify-space-between"
                            >
                                <div class="d-flex align-center ">
                                    <v-card-text
                                        class="text-h4 my-auto white--text"
                                    >
                                        UPGRADE PLAN</v-card-text
                                    >
                                </div>

                                <v-avatar class="ma-3" size="125">
                                    <v-icon size="100px" color="white"
                                        >mdi-rocket-launch</v-icon
                                    >
                                </v-avatar>
                            </div>
                        </v-card>
                        <!-- <v-btn
                            x-large
                            block
                            rounded
                            color="primary"
                            class="white--text"
                            @click="openCreditDialog()"
                            >UPDAGRADE PLAN</v-btn
                        > -->
                    </v-col>
                </v-row>
                <v-row justify="space-between" class="purchase-history">
                    <v-overlay :value="historyLoading">
                        <v-progress-circular
                            :size="100"
                            :width="5"
                            indeterminate
                        ></v-progress-circular>
                    </v-overlay>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="12">
                                <div class="purchase-history-title">
                                    Purchase History
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <v-btn
                            class="primary--text font-weigt-bold"
                            text
                            to="purchase-histories"
                            >View All<v-icon medium dark>
                                mdi-chevron-right
                            </v-icon></v-btn
                        >
                    </v-col>
                    <v-col cols="12">
                        <v-list dense v-if="histories">
                            <v-list-item
                                v-for="(history, index) in histories"
                                :key="index"
                            >
                                <v-list-item-action>
                                    <v-icon large color="success"
                                        >mdi-cart-variant</v-icon
                                    >
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-bold"
                                        >₱
                                        {{
                                            formattedAmount(history.amount)
                                        }}</v-list-item-title
                                    >
                                    <v-list-item-subtitle>{{
                                        history.created_at | myDateTime
                                    }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-chip
                                        class="white--text"
                                        :color="statusColor(history.status)"
                                    >
                                        {{ history.status }}
                                    </v-chip>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
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
        <v-dialog v-model="planDialog" max-width="1500px">
            <v-card id="plan">
                <v-container>
                    <v-row
                        justify="center"
                        no-gutters
                        :class="{
                            'text-center mt-16': $vuetify.breakpoint.xs,
                            'text-center mt-0': $vuetify.breakpoint.mdAndUp
                        }"
                    >
                        <p class="package-class">
                            Pick your preferred SMS Plan
                        </p>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col cols="12">
                            <v-row justify="center" align="center">
                                <v-col
                                    v-for="plan in plans"
                                    :key="plan.id"
                                    cols="12"
                                >
                                    <v-card elevation="0" class="transparent">
                                        <v-card-text class="text-center">
                                            <img
                                                :src="plan.icon"
                                                alt=""
                                                :width="
                                                    $vuetify.breakpoint.xl
                                                        ? '380px'
                                                        : '250px'
                                                "
                                            />
                                            <p class="mt-3 package-description">
                                                {{ plan.description }}
                                            </p>
                                            <v-row justify="center">
                                                <v-col
                                                    v-for="item in plan.items"
                                                    :key="item.id"
                                                    cols="12"
                                                    md="3"
                                                >
                                                    <v-card elevation="9">
                                                        <v-card-text
                                                            class="text-center"
                                                            align="center"
                                                        >
                                                            <p
                                                                class="package-name"
                                                            >
                                                                {{ item.name }}
                                                            </p>
                                                            <p
                                                                class="package-rate"
                                                            >
                                                                ₱{{ item.rate }}
                                                            </p>
                                                            <p class="ma-4">
                                                                {{
                                                                    item.description
                                                                }}
                                                            </p>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                @click="
                                                                    openUpgradePlanDialog(
                                                                        item,
                                                                        true
                                                                    )
                                                                "
                                                                v-if="
                                                                    subscriber
                                                                        .plan
                                                                        .id <
                                                                        item.id
                                                                "
                                                                rounded
                                                                large
                                                                block
                                                                color="success"
                                                            >
                                                                UPGRADE
                                                            </v-btn>
                                                            <v-btn
                                                                @click="
                                                                    openUpgradePlanDialog(
                                                                        item,
                                                                        false
                                                                    )
                                                                "
                                                                v-else-if="
                                                                    subscriber
                                                                        .plan
                                                                        .id >
                                                                        item.id
                                                                "
                                                                rounded
                                                                large
                                                                block
                                                                color="success"
                                                            >
                                                                DOWNGRADE
                                                            </v-btn>
                                                            <h6
                                                                v-else
                                                                class="success--text"
                                                            >
                                                                CURRENT PLAN
                                                            </h6>
                                                            <v-spacer></v-spacer>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
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
                                    <strong class="black--text">JobCare </strong
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
                                    <strong class="black--text">JobCare </strong
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
        <v-dialog v-model="upgradeDialog" max-width="500px" persistent
            ><v-form ref="upgradeForm" lazy-validation>
                <v-card id="plan">
                    <v-toolbar elevation="0" color="success">
                        <v-spacer></v-spacer>
                        <v-card-title class="headline white--text">
                            {{ formTitle }}
                        </v-card-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-row justify="center">
                            <v-col cols="12">
                                <v-row>
                                    <v-col>
                                        <v-row justify="center">
                                            <v-col cols="6 text-right">
                                                <span
                                                    class="font-weight-bold primary--text"
                                                    >Current Plan
                                                </span>
                                            </v-col>
                                            <v-col cols="6 text-left">
                                                <span
                                                    class="font-weight-bold success--text"
                                                    >New Plan
                                                </span>
                                            </v-col>
                                            <v-divider />
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="6 text-right">
                                                <span class="black--text"
                                                    >{{ subscriber.plan.name }}
                                                </span>
                                            </v-col>
                                            <v-col cols="6 text-left">
                                                <span
                                                    class="font-weight-bold black--text"
                                                    >{{
                                                        upgradePlanInformation
                                                            .plan.name
                                                    }}
                                                </span>
                                            </v-col>
                                            <v-divider />
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="6 text-right">
                                                <span class="black--text"
                                                    >{{ subscriber.plan.rate }}
                                                    / sms
                                                </span>
                                            </v-col>
                                            <v-col cols="6 text-left">
                                                <span
                                                    class="font-weight-bold black--text"
                                                    >{{
                                                        upgradePlanInformation
                                                            .plan.rate
                                                    }}
                                                    / sms
                                                </span>
                                            </v-col>
                                            <v-divider />
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="6 text-right">
                                                <span
                                                    class="black--text"
                                                    v-if="
                                                        subscriber.plan
                                                            .has_sender_id
                                                    "
                                                    >With Sender ID
                                                </span>
                                                <span class="black--text" v-else
                                                    >Without Sender ID
                                                </span>
                                            </v-col>
                                            <v-col cols="6 text-left">
                                                <span
                                                    class="font-weight-bold black--text"
                                                    v-if="
                                                        upgradePlanInformation
                                                            .plan.has_sender_id
                                                    "
                                                    >With Sender ID
                                                </span>
                                                <span
                                                    class="font-weight-bold black--text"
                                                    v-else
                                                    >Without Sender ID
                                                </span>
                                            </v-col>
                                            <v-divider />
                                        </v-row>
                                        <v-row justify="center">
                                            <v-col cols="6 text-right">
                                                <span class="black--text"
                                                    >{{
                                                        subscriber.plan.credits
                                                    }}
                                                    Credits
                                                </span>
                                            </v-col>
                                            <v-col cols="6 text-left">
                                                <span
                                                    class="font-weight-bold black--text"
                                                    >{{
                                                        upgradePlanInformation
                                                            .plan.credits
                                                    }}
                                                    Credits
                                                </span>
                                            </v-col>
                                            <v-divider />
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="12" md="9"
                                        ><v-text-field
                                            outlined
                                            v-model="
                                                upgradePlanInformation.voucher
                                            "
                                            :error-messages="
                                                formUpgradeError.voucher
                                            "
                                            ><template v-slot:label>
                                                <div>
                                                    Voucher
                                                    <small>(Optional)</small>
                                                </div>
                                            </template></v-text-field
                                        ><v-text-field
                                            v-if="
                                                upgradePlanInformation.plan
                                                    .has_sender_id
                                            "
                                            outlined
                                            v-model="
                                                upgradePlanInformation.sender_id
                                            "
                                            :error-messages="
                                                formUpgradeError.sender_id
                                            "
                                            label="Preffered Sender ID"
                                        ></v-text-field>
                                        <!-- <v-textarea
                                            outlined
                                            v-model="
                                                upgradePlanInformation.message
                                            "
                                            label="Message"
                                        ></v-textarea> -->
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="px-12" text @click="upgradeDialog = false"
                            >Cancel</v-btn
                        >
                        <v-btn
                            class="px-12"
                            @click="upgradeCurrentPlan(), (loader = 'loading')"
                            :loading="componentOverlay"
                            :disabled="componentOverlay"
                            color="primary"
                            >Apply Now
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-cached</v-icon>
                                </span>
                            </template></v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            charts: [
                {
                    data: {
                        labels: [
                            "Ja",
                            "Fe",
                            "Ma",
                            "Ap",
                            "Mai",
                            "Ju",
                            "Jul",
                            "Au",
                            "Se",
                            "Oc",
                            "No",
                            "De"
                        ],
                        series: [
                            [
                                542,
                                443,
                                320,
                                780,
                                553,
                                453,
                                326,
                                434,
                                568,
                                610,
                                756,
                                895
                            ]
                        ]
                    },
                    options: {
                        axisY: {
                            type: this.$chartist.FixedScaleAxis,
                            low: 0,
                            high: 100
                        },
                        axisX: {
                            showGrid: false
                        },
                        low: 0,
                        high: 100,
                        chartPadding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 0
                        }
                    },
                    responsiveOptions: [
                        [
                            "screen and (max-width: 640px)",
                            {
                                seriesBarDistance: 5,
                                axisX: {
                                    labelInterpolationFnc: function(value) {
                                        return value[0];
                                    }
                                }
                            }
                        ]
                    ],
                    label: {
                        title: "Sent Messages",
                        subtitle: "This month performance",
                        time: "Updated minute ago"
                    },
                    design: {
                        color: "green",
                        type: "Line"
                    }
                },
                {
                    data: {
                        labels: [
                            "Ja",
                            "Fe",
                            "Ma",
                            "Ap",
                            "Mai",
                            "Ju",
                            "Jul",
                            "Au",
                            "Se",
                            "Oc",
                            "No",
                            "De"
                        ],
                        series: [
                            [
                                542,
                                443,
                                320,
                                780,
                                553,
                                453,
                                326,
                                434,
                                568,
                                610,
                                756,
                                895
                            ]
                        ]
                    },
                    options: {
                        axisY: {
                            type: this.$chartist.FixedScaleAxis,
                            low: 0,
                            high: 100
                        },
                        axisX: {
                            showGrid: false
                        },
                        low: 0,
                        high: 100,
                        chartPadding: {
                            top: 0,
                            right: 5,
                            bottom: 0,
                            left: 0
                        }
                    },
                    responsiveOptions: [
                        [
                            "screen and (max-width: 640px)",
                            {
                                seriesBarDistance: 5,
                                axisX: {
                                    labelInterpolationFnc: function(value) {
                                        return value[0];
                                    }
                                }
                            }
                        ]
                    ],
                    label: {
                        title: "Sent Messages",
                        subtitle: "This week performance",
                        time: "Updated minute ago"
                    },
                    design: {
                        color: "primary",
                        type: "Line"
                    }
                }
            ],
            stats: [
                {
                    color: "green",
                    icon: "mdi-account-group",
                    title: "Groups",
                    value: "0",
                    smallvalue: "",
                    subicon: "mdi-update",
                    subiconcolor: "",
                    subtext: "Just Updated",
                    subtextcolor: ""
                },
                {
                    color: "orange",
                    icon: "mdi-account",
                    title: "Accounts",
                    value: "0",
                    smallvalue: "",
                    subicon: "mdi-update",
                    subiconcolor: "",
                    subtext: "Just Updated",
                    subtextcolor: ""
                },
                {
                    color: "info",
                    icon: "fa-coins",
                    title: "Credits",
                    value: "0",
                    smallvalue: "",
                    subicon: "mdi-update",
                    subiconcolor: "",
                    subtext: "Just Updated",
                    subtextcolor: ""
                },
                {
                    color: "red",
                    icon: "fa-sms",
                    title: "SMS Remaining",
                    value: "0",
                    smallvalue: "",
                    subicon: "mdi-update",
                    subiconcolor: "",
                    subtext: "Basic Plan",
                    subtextcolor: ""
                }
            ],
            plans: [
                {
                    name: "Learner Plus",
                    icon: "/img/packages/icon1.png",
                    description:
                        "Fit for the school organizations basic education and tertiary schools",
                    items: [
                        {
                            id: 2,
                            name: "Todler",
                            rate: "500.00",
                            description: "1,000 SMS Credits, No Sender ID"
                        },
                        {
                            id: 3,
                            name: "Primary",
                            rate: "700.00",
                            description: "1,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 4,
                            name: "Advanced",
                            rate: "900.00",
                            description: "2,000 SMS Credits, With Sender ID"
                        }
                    ]
                },
                {
                    name: "Startup",
                    icon: "/img/packages/icon2.png",
                    description:
                        "Suitable for small-to-medium enterprises and local businesses",
                    items: [
                        {
                            id: 5,
                            name: "Lite",
                            rate: "1,500.00",
                            description: "3,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 6,
                            name: "Premiere",
                            rate: "2,500.00",
                            description: "5,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 7,
                            name: "Pro",
                            rate: "5,000.00",
                            description: "10,000 SMS Credits, With Sender ID"
                        }
                    ]
                },
                {
                    name: "Corporate",
                    icon: "/img/packages/icon3.png",
                    description:
                        "Appropriate for companies with nationwide operations",
                    items: [
                        {
                            id: 8,
                            name: "Essentials",
                            rate: "10,000.00",
                            description: "22,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 9,
                            name: "CORPORATE II",
                            rate: "50,000.00",
                            description: "225,000 SMS Credits, With Sender ID"
                        },
                        {
                            id: 10,
                            name: "Premium",
                            rate: "150,000.00",
                            description: "1,000,000 SMS Credits, With Sender ID"
                        }
                    ]
                }
            ],
            subscriber: {
                details: {
                    first_name: "",
                    last_name: ""
                },
                plan: {},
                subscriber_plan: {}
            },
            upgradePlanInformation: {
                plan: {
                    id: null,
                    name: null
                },
                reference_code: null,
                message: "Plan Upgrade!"
            },
            upgradePlan: false,
            selections: ["500", "1,000", "2,500", "5,000", "10,000"],
            credit: 0,
            profileId: sessionStorage.getItem("profile-id"),
            histories: [{}],
            paymentMethod: "",
            paymentDetails: {
                reference_code: "",
                status: "",
                amount: ""
            },
            formUpgradeError: {
                referral_code: null
            },

            rules: {
                //Form Field Rules
                required: [v => !!v || "Field is required"]
            },

            formCreditDialog: false,
            componentOverlay: true,
            historyLoading: true,
            planDialog: false,
            paymentInstructionDialog: false,
            upgradeDialog: false
        };
    },

    computed: {
        avatarSize() {
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                    return 70;
                case "sm":
                    return 80;
                case "md":
                    return 100;
                case "lg":
                    return 120;
                case "xl":
                    return 150;
            }
        },

        formTitle() {
            if (this.upgradePlan == true) {
                return "Upgrade Plan ";
            } else {
                return "Downgrade Plan";
            }
        }
    },

    methods: {
        fetchHistories() {
            this.historyLoading = true;
            axios
                .get(
                    "/api/v1/subscribers/" +
                        this.profileId +
                        "/purchase-histories"
                )
                .then(response => {
                    this.histories = [];
                    let histories = response.data;
                    if (!!histories[0]) {
                        this.histories = histories;
                        if (this.histories.length > 5)
                            this.histories.length = 5;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.historyLoading = false;
                });
        },

        fetchDashboard() {
            axios
                .get("/api/v1/dashboard")
                .then(response => {
                    let datas = response.data;
                    this.charts[0].data = {
                        ...datas.sms.graph.daily
                    };
                    this.charts[1].data = {
                        ...datas.sms.graph.weekly
                    };
                    this.subscriber = {
                        details: datas.subscriber,
                        subscriber_plan: {
                            ...datas.subscriber_plan
                        },
                        plan: {
                            ...datas.plan
                        }
                    };

                    let stats = datas.total;
                    stats = {
                        ...stats,
                        ...this.subscriber.subscriber_plan
                    };
                    let i = 0;
                    let keys =
                        sessionStorage.getItem("user-type") == "ADMINISTRATOR"
                            ? ["orders", "establishments", "group", "contact"]
                            : ["group", "contact", "credits", "available"];
                    this.stats.forEach(stat => {
                        stat.value = stats[keys[i]].toString();
                        if (stat.title == "SMS Remaining") {
                            stat.subtext = this.subscriber.plan.name;
                        }
                        i++;
                    });
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.componentOverlay = false;
                });
        },

        fetchPlans() {
            axios
                .get("/api/v1/plans")
                .then(response => {
                    this.plans = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        proceedPayment() {
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

        upgradeCurrentPlan() {
            this.componentOverlay = true;
            axios
                .post("/api/v1/plans/upgrade", {
                    subscriber: this.profileId,
                    plan: this.upgradePlanInformation.plan.id,
                    message: this.upgradePlanInformation.message,
                    voucher: this.upgradePlanInformation.voucher,
                    sender_id: this.upgradePlanInformation.sender_id
                })
                .then(response => {
                    swal.fire({
                        position: "top-end",
                        toast: true,
                        type: "success",
                        icon: "success",
                        text: "Upgrade Request Sent!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.upgradeDialog = false;
                    this.planDialog = false;
                    this.credit = 0;
                    this.componentOverlay = false;
                });
        },

        openCreditDialog() {
            this.credit = 0;
            this.formCreditDialog = true;
        },

        openUpgradePlanDialog(plan, condition) {
            this.upgradeDialog = true;
            this.upgradePlanInformation.plan = plan;
            this.upgradePlan = condition;
        },

        statusColor(status) {
            if (status == "COMPLETED") {
                return "success";
            } else if (status == "PENDING") {
                return "primary";
            } else if (status == "CANCELLED" || status == "DECLINED") {
                return "error";
            }
        },

        formattedAmount(number) {
            let internationalNumberFormat = new Intl.NumberFormat("en-US");
            return internationalNumberFormat.format(number);
        }
    },

    mounted() {
        this.fetchDashboard();
        this.fetchHistories();
        // this.fetchPlans();
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
