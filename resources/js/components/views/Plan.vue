<template>
    <v-app>
        <views-navigation class="mb-3" :color="color" :flat="flat" />
        <v-overlay :value="componentOverlay">
            <v-progress-circular
                :size="100"
                :width="5"
                indeterminate
            ></v-progress-circular>
        </v-overlay>
        <v-container
            id="plan"
            style="margin-top: 4em;"
            :class="{
                'text-center mt-16': $vuetify.breakpoint.smAndDown,
                'text-center mt-16': $vuetify.breakpoint.mdAndUp
            }"
        >
            <v-row justify="center">
                <v-col cols="12" lg="8"
                    ><div class="row gx-5 align-items-center">
                        <div class="col-lg-8">
                            <!-- Mashead text and app badges-->
                            <div class="mb-5 mb-lg-0 text-center text-lg-start">
                                <h1
                                    class="heading-1"
                                    data-aos="fade-right"
                                    data-aos-delay="50"
                                >
                                    Affordable SMS packages
                                </h1>
                                <h1
                                    class="heading-2 mb-3"
                                    data-aos="fade-right"
                                    data-aos-delay="50"
                                >
                                    align to your needs.
                                </h1>
                                <p
                                    class="lead text-muted mb-5"
                                    data-aos="fade-right"
                                    data-aos-delay="100"
                                >
                                    NO ONE-TIME IMPLEMENTATION FEE, NO HIDDEN
                                    CHARGES, NO LOCK-IN
                                </p>
                            </div>
                        </div>
                        <div
                            class="col-lg-4"
                            data-aos="fade-left"
                            data-aos-delay="100"
                        >
                            <img
                                class="img-fluid"
                                src="/img/group-chat.png"
                                alt="..."
                            />
                        </div></div
                ></v-col>
            </v-row>
            <v-row
                justify="center"
                no-gutters
                :class="{
                    'text-center mt-16': $vuetify.breakpoint.xs,
                    'text-center mt-0': $vuetify.breakpoint.mdAndUp
                }"
            >
                <p class="package-class">Pick your preferred SMS Plan</p>
            </v-row>
            <v-row justify="center" align="center">
                <v-col cols="12" xl="9">
                    <v-row justify="center" align="center">
                        <v-col
                            v-for="plan in plans"
                            :key="plan.id"
                            cols="12"
                            md="4"
                        >
                            <v-card elevation="9">
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
                                    <div
                                        v-for="item in plan.items"
                                        :key="item.id"
                                        cols="12"
                                        md="4"
                                    >
                                        <div
                                            class="d-flex justify-content-center"
                                        >
                                            <div class="sms-name mr-3">
                                                {{ item.name }}
                                            </div>
                                            <span class="sms-rate"
                                                >₱{{ item.rate }}.</span
                                            >
                                        </div>

                                        <span class="ma-4">{{
                                            item.description
                                        }}</span>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="ma-3">
                                    <v-btn
                                        rounded
                                        large
                                        block
                                        to="/signup"
                                        color="success"
                                    >
                                        SUBSRIBE
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-container id="subscribe">
                <v-row justify="center" class="mt-16 py-16 my-16">
                    <v-col cols="12" lg="8"
                        ><v-row align="center">
                            <v-col
                                cols="12"
                                lg="8"
                                class="text-center text-lg-start"
                            >
                                <div class="mb-5 mb-lg-0 ">
                                    <h1
                                        class=""
                                        data-aos="fade-right"
                                        data-aos-delay="50"
                                    >
                                        Sign up today for a <br />
                                        <span style="color: #8ECF8D;"
                                            >free </span
                                        ><span style="color: #1976D2;"
                                            >1-month trial!</span
                                        >
                                    </h1>
                                    <p
                                        data-aos="fade-right"
                                        data-aos-delay="100"
                                    >
                                        People are waiting to know about updates
                                        on your organization, school, or
                                        company!<br />
                                        <strong>
                                            Make SMS ON your trusted mobile
                                            marketing platform.
                                        </strong>
                                    </p>
                                    <span
                                        data-aos="fade-right"
                                        data-aos-delay="150"
                                    >
                                        For special mobile marketing packages,
                                        contact us!
                                    </span>
                                </div>
                                <v-btn
                                    data-aos="fade-right"
                                    data-aos-delay="200"
                                    x-large
                                    rounded
                                    color="success"
                                    class="mt-5"
                                    width="200px"
                                    to="signup"
                                    >SIGN-UP</v-btn
                                >
                            </v-col>
                            <v-col
                                cols="12"
                                lg="4"
                                class="d-flex align-content-center justify-content-center
                             flex-wrap"
                            >
                                <img
                                    data-aos="fade-left"
                                    data-aos-delay="50"
                                    class="img-fluid"
                                    src="/img/trial.png"
                                    alt="..."
                                />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        <!-- Footer -->
        <views-footer />
        <v-scale-transition>
            <v-btn
                fab
                v-show="fab"
                v-scroll="onScroll"
                dark
                fixed
                bottom
                right
                color="secondary"
                @click="toTop"
            >
                <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
        </v-scale-transition>
    </v-app>
</template>
<script type="text/javascript">
window.$crisp = [];
window.CRISP_WEBSITE_ID = "50e44ccc-d96e-4523-963b-08293bfb3a60";
(function() {
    d = document;
    s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
})();
</script>
<script>
export default {
    data() {
        return {
            plans: [
                {
                    name: "Learner Plus",
                    icon: "/img/packages/icon1.png",
                    description:
                        "Fit for the school organizations basic education and tertiary schools",
                    items: [
                        {
                            id: 1,
                            name: "Todler",
                            rate: "500.00",
                            description: "1,000 SMS Credits, No Sender ID"
                        },
                        {
                            id: 2,
                            name: "Primary",
                            rate: "700.00",
                            description: "1,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 3,
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
                            id: 4,
                            name: "Lite",
                            rate: "1,500.00",
                            description: "3,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 5,
                            name: "Premiere",
                            rate: "2,500.00",
                            description: "5,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 6,
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
                            id: 7,
                            name: "Essentials",
                            rate: "10,000.00",
                            description: "22,500 SMS Credits, With Sender ID"
                        },
                        {
                            id: 8,
                            name: "CORPORATE II",
                            rate: "50,000.00",
                            description: "225,000 SMS Credits, With Sender ID"
                        },
                        {
                            id: 9,
                            name: "Premium",
                            rate: "150,000.00",
                            description: "1,000,000 SMS Credits, With Sender ID"
                        }
                    ]
                }
            ],
            fab: null,
            color: "",
            flat: null,
            componentOverlay: false
        };
    },

    methods: {
        fetchPlans() {
            this.componentOverlay = true;
            axios
                .get("/api/v1/plans")
                .then(response => {
                    this.plans = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.componentOverlay = false;
                });
        },

        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 60;
        },

        toTop() {
            this.$vuetify.goTo(0);
        },

        formattedAmount(number) {
            let internationalNumberFormat = new Intl.NumberFormat("en-US");
            return internationalNumberFormat.format(number);
        }
    },

    created() {
        // this.fetchPlans();
        const top = window.pageYOffset || 0;
        if (top <= 40) {
            this.color = "transparent";
            this.flat = true;
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
    }
};
</script>
