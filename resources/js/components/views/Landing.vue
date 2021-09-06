<template>
    <v-app>
        <views-navigation :color="color" :flat="flat" />

        <!-- Mashead header-->
        <header id="hero" class="masthead">
            <v-row justify="center">
                <v-col cols="12" xl="8">
                    <div class="container px-5">
                        <v-row class="gx-5" align="center">
                            <v-col cols="12" lg="4">
                                <!-- Mashead text and app badges-->
                                <div
                                    class="mb-5 mb-lg-0 text-center text-lg-start"
                                >
                                    <v-chip
                                        class="primary--text mb-4"
                                        color="white"
                                        data-aos="fade-right"
                                        data-aos-delay="50"
                                    >
                                        Looking for a job?
                                    </v-chip>
                                    <p
                                        class="hero-title lh-1 mb-3"
                                        data-aos="fade-right"
                                        data-aos-delay="50"
                                    >
                                        Explore More Than 1000+ Jobs
                                    </p>
                                    <p
                                        class="lead fw-normal text-muted mb-5"
                                        data-aos="fade-right"
                                        data-aos-delay="100"
                                    >
                                        Find a job that suits you with just a
                                        few click!
                                    </p>
                                    <v-btn
                                        large
                                        rounded
                                        color="primary"
                                        data-aos="fade-right"
                                        data-aos-delay="200"
                                        data-aos-offset="-500"
                                    >
                                        Get Started
                                    </v-btn>
                                </div>
                            </v-col>
                            <v-col
                                cols="12"
                                lg="8"
                                data-aos="fade-left"
                                data-aos-delay="100"
                            >
                                <img
                                    class="img-fluid"
                                    src="/img/Asset1.png"
                                    alt="..."
                                />
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </header>

        <section id="jobpost">
            <v-row justify="center">
                <v-col cols="12" xl="8">
                    <h1 class="primary--text">Job Post</h1>
                    <v-row>
                        <v-col
                            v-for="job in jobs"
                            :key="job.id"
                            cols="12"
                            md="4"
                        >
                            <v-card elevation="9" color="secondary">
                                <v-card-text>
                                    <v-row>
                                        <v-col>
                                            <p class="job-name black--text">
                                                {{ job.name }}
                                            </p>
                                            <p class="job-type">
                                                {{ job.type }}
                                            </p>
                                        </v-col>
                                        <v-col class="text-right">
                                            <p
                                                class="job-payment  primary--text"
                                            >
                                                ₱{{ job.payment }}
                                            </p>
                                            <p
                                                class="job-date font-weight-normal"
                                            >
                                                {{ job.date }}
                                            </p>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn rounded block color="primary" large
                                        >See More</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </section>
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
<script>
export default {
    data() {
        return {
            fab: null,
            color: "",
            flat: null,
            jobs: [
                {
                    id: 1,
                    name: "Gardening",
                    type: "FullTime",
                    payment: "500",
                    date: "June 1, 2021"
                },
                {
                    id: 1,
                    name: "Plumbing",
                    type: "PartTime",
                    payment: "500",
                    date: "June 4, 2021"
                },
                {
                    id: 1,
                    name: "Electrician",
                    type: "PartTime",
                    payment: "500",
                    date: "July 12, 2021"
                },
                {
                    id: 1,
                    name: "Capenter",
                    type: "Fulltime",
                    payment: "500",
                    date: "August 3, 2021"
                }
            ]
        };
    },

    created() {
        const top = window.pageYOffset || 0;
        if (top <= 60) {
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
    },

    methods: {
        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 60;
        },

        toTop() {
            this.$vuetify.goTo(0);
        }
    },

    beforeRouteEnter(to, from, next) {
        if (sessionStorage.getItem("user-type")) {
            if (sessionStorage.getItem("user-type") == "ADMINISTRATOR") {
                return next("admin/dashboard");
            } else if (sessionStorage.getItem("user-type") == "SUBSCRIBER") {
                return next("/dashboard");
            }
        }
        next();
    }
};
</script>
