<template>
    <v-app>
        <views-navigation :color="color" :flat="flat" />

        <!-- Mashead header-->
        <header id="hero" class="masthead">
            <v-row justify="center">
                <v-col cols="12" lg="8">
                    <div class="container px-5">
                        <div class="row gx-5 align-items-center">
                            <div class="col-lg-4">
                                <!-- Mashead text and app badges-->
                                <div
                                    class="mb-5 mb-lg-0 text-center text-lg-start"
                                >
                                    <h1
                                        class="display-1 lh-1 mb-3"
                                        data-aos="fade-right"
                                        data-aos-delay="50"
                                    >
                                        Reach your offline audience.
                                    </h1>
                                    <p
                                        class="lead fw-normal text-muted mb-5"
                                        data-aos="fade-right"
                                        data-aos-delay="100"
                                    >
                                        Don't let your audiences drift away.
                                        Keep them updated the traditional way!
                                    </p>
                                    <div
                                        class="d-flex flex-column flex-lg-row align-items-center"
                                        data-aos="fade-right"
                                        data-aos-delay="200"
                                    >
                                        <a
                                            class="me-lg-3 mb-4 mb-lg-0"
                                            href="#!"
                                            ><img
                                                class="app-badge"
                                                src="img/google-play-badge.svg"
                                                alt="..."
                                        /></a>
                                        <a href="#!"
                                            ><img
                                                class="app-badge"
                                                src="img/app-store-badge.svg"
                                                alt="..."
                                        /></a>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-8"
                                data-aos="fade-left"
                                data-aos-delay="100"
                            >
                                <img
                                    class="img-fluid"
                                    src="/img/sms-banner.png"
                                    alt="..."
                                />
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </header>
        <!-- Quote/testimonial aside-->
        <aside id="quote" class="text-center bg-gradient-primary-to-secondary">
            <v-row justify="center">
                <v-col cols="12" lg="8">
                    <div class="container px-5">
                        <div class="row gx-5 justify-content-center">
                            <div class="col-xl-8">
                                <div class="h2 fs-1 text-white mb-4">
                                    "SMS marketing is a very powerful tool for
                                    driving sales and growing an active customer
                                    base."
                                </div>
                                <!-- <img
                                    src="img/tnw-logo.svg"
                                    alt="..."
                                    style="height: 3rem"
                                /> -->
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </aside>
        <!-- App features section-->
        <section id="features">
            <v-row justify="center">
                <v-col cols="12" lg="8">
                    <div class="container px-5">
                        <div class="row gx-5 align-items-center">
                            <div class="col-lg-8 order-lg-1 mb-5 mb-lg-0">
                                <div class="container-fluid px-5">
                                    <div class="row gx-5">
                                        <div
                                            class="col-md-6 mb-5"
                                            data-aos="fade-up"
                                            data-aos-delay="100"
                                        >
                                            <!-- Feature item-->
                                            <div class="text-center">
                                                <i
                                                    class="bi-phone-fill icon-feature text-gradient d-block mb-3"
                                                ></i>
                                                <h3 class="font-alt">
                                                    Mobile App access
                                                </h3>
                                                <p class="text-muted mb-0">
                                                    Keep up with your audience
                                                    on the go. You can bring SMS
                                                    ON wherever you go.
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="col-md-6 mb-5"
                                            data-aos="fade-up"
                                            data-aos-delay="200"
                                        >
                                            <!-- Feature item-->
                                            <div class="text-center">
                                                <i
                                                    class="bi-file-code-fill icon-feature text-gradient d-block mb-3"
                                                ></i>
                                                <h3 class="font-alt">
                                                    Developer Friendly
                                                </h3>
                                                <p class="text-muted mb-0">
                                                    Find out what we have and
                                                    why you need them. Have
                                                    access to all features you
                                                    need at the click of your
                                                    mouse.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div
                                            class="col-md-6 mb-5 mb-md-0"
                                            data-aos="fade-up"
                                            data-aos-delay="300"
                                        >
                                            <!-- Feature item-->
                                            <div class="text-center">
                                                <i
                                                    class="bi-cloud-upload-fill icon-feature text-gradient d-block mb-3"
                                                ></i>
                                                <h3 class="font-alt">
                                                    Easy API Integration
                                                </h3>
                                                <p class="text-muted mb-0">
                                                    No hassle when it comes to
                                                    integrating our features.
                                                    Just an API call and you're
                                                    all set!
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            class="col-md-6"
                                            data-aos="fade-up"
                                            data-aos-delay="400"
                                        >
                                            <!-- Feature item-->
                                            <div class="text-center">
                                                <i
                                                    class="bi-patch-check-fill icon-feature text-gradient d-block mb-3"
                                                ></i>
                                                <h3 class="font-alt">
                                                    User Friendly
                                                </h3>
                                                <p class="text-muted mb-0">
                                                    Showing you the things you
                                                    need where you need them to
                                                    be.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="col-lg-4 order-lg-0"
                                data-aos="fade-right"
                                data-aos-delay="100"
                            >
                                <!-- Features section device mockup-->
                                <div class="features-device-mockup">
                                    <svg
                                        class="circle"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="circleGradient"
                                                gradientTransform="rotate(45)"
                                            >
                                                <stop
                                                    class="gradient-start-color"
                                                    offset="0%"
                                                ></stop>
                                                <stop
                                                    class="gradient-end-color"
                                                    offset="100%"
                                                ></stop>
                                            </linearGradient>
                                        </defs>
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="50"
                                        ></circle></svg
                                    ><svg
                                        class="shape-1 d-none d-sm-block"
                                        viewBox="0 0 240.83 240.83"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="-32.54"
                                            y="78.39"
                                            width="305.92"
                                            height="84.05"
                                            rx="42.03"
                                            transform="translate(120.42 -49.88) rotate(45)"
                                        ></rect>
                                        <rect
                                            x="-32.54"
                                            y="78.39"
                                            width="305.92"
                                            height="84.05"
                                            rx="42.03"
                                            transform="translate(-49.88 120.42) rotate(-45)"
                                        ></rect></svg
                                    ><svg
                                        class="shape-2 d-none d-sm-block"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                    <div class="device-wrapper">
                                        <div
                                            class="device"
                                            data-device="iPhoneX"
                                            data-orientation="portrait"
                                            data-color="black"
                                        >
                                            <div class="screen bg-black">
                                                <!-- PUT CONTENTS HERE:-->
                                                <!-- * * This can be a video, image, or just about anything else.-->
                                                <!-- * * Set the max width of your media to 100% and the height to-->
                                                <!-- * * 100% like the demo example below.-->
                                                <video
                                                    muted="muted"
                                                    autoplay=""
                                                    loop=""
                                                    style="max-width: 100%; height: 100%"
                                                >
                                                    <source
                                                        src="img/demo-video.mp4"
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </section>
        <!-- Basic features section-->
        <section class="bg-light">
            <v-row justify="center">
                <v-col cols="12" lg="8">
                    <div class="container px-5">
                        <div
                            class="row gx-5 align-items-center justify-content-center justify-content-lg-between"
                        >
                            <div class="col-12 col-lg-5">
                                <h2 class="display-6 lh-1 mb-4">
                                    When everyone rushes to the future, let's
                                    not forget the old but gold, SMS feature.
                                </h2>
                                <p
                                    class="lead fw-normal text-muted mb-5 mb-lg-0"
                                >
                                    SMS is the oldest, most widespread, and
                                    frequently used texting technology that is
                                    supported by every single mobile network and
                                    device today. What better way is there to
                                    reach your audience than the good old
                                    messaging service?
                                </p>
                            </div>
                            <div class="col-sm-8 col-md-6">
                                <div class="px-5 px-sm-0">
                                    <img
                                        class="img-fluid"
                                        src="/img/illustration.png"
                                        alt="..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </section>
        <section>
            <div class="client-area mb-10  partner">
                <div class="container px-5 text-center">
                    <span>OUR <span id="orange">PARTNERS</span></span>

                    <v-row justify="center" class="mt-12">
                        <v-col cols="12" md="3">
                            <img src="/img/1.png" alt="" />
                        </v-col>
                        <v-col cols="12" md="3">
                            <img src="/img/3.png" alt="" />
                        </v-col>
                        <v-col cols="12" md="3">
                            <img src="/img/2.png" alt="" />
                        </v-col>
                    </v-row>
                </div>
            </div>
        </section>
        <!-- Call to action section-->
        <!-- <section class="cta">
            <div class="cta-content">
                <v-row justify="center">
                    <v-col cols="12" lg="8">
                        <div class="container px-5">
                            <h2 class="text-white display-1 lh-1 mb-4">
                                Don't make them wait.
                                <br />
                                Reach your audience now.
                            </h2>
                            <a
                                class="btn btn-outline-light py-3 px-4 rounded-pill"
                                href="https://startbootstrap.com/theme/new-age"
                                target="_blank"
                                >Download for free</a
                            >
                        </div>
                    </v-col>
                </v-row>
            </div>
        </section> -->
        <!-- App badge section-->
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
            fab: null,
            color: "",
            flat: null,
            slickOptions: {
                slidesToShow: 3
                // Any other options that can be got from plugin documentation
            }
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
        },

        next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
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
