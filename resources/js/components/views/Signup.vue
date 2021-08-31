<template>
    <v-app>
        <views-navigation :color="color" :flat="flat" />
        <div class="signin">
            <v-container class="signin-container" fluid fill-height>
                <v-row justify="center" v-show="e1 == 1">
                    <v-col cols="12" xl="8">
                        <v-container
                            width="80vw"
                            max-width="100vw"
                            min-width="400"
                            fluid
                        >
                            <v-row justify="center" class="mt-16">
                                <v-col id="column-1" cols="12" lg="8" class="">
                                    <v-row justify="center" class="text-center">
                                        <h1
                                            class="font-weight-bold primary--text"
                                        >
                                            Register Free Account
                                        </h1>
                                    </v-row>
                                    <v-row justify="center">
                                        <v-col cols="12" xl="9">
                                            <v-card
                                                class="transparent elevation-0"
                                            >
                                                <v-container>
                                                    <v-form
                                                        ref="form"
                                                        lazy-validation
                                                    >
                                                        <v-row justify="center">
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                                ><v-text-field
                                                                    v-model="
                                                                        user.first_name
                                                                    "
                                                                    :error-messages="
                                                                        formSignUpError.first_name
                                                                    "
                                                                    :rules="
                                                                        rules.required
                                                                    "
                                                                    label="First Name"
                                                                ></v-text-field
                                                            ></v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                                ><v-text-field
                                                                    v-model="
                                                                        user.last_name
                                                                    "
                                                                    :error-messages="
                                                                        formSignUpError.last_name
                                                                    "
                                                                    :rules="
                                                                        rules.required
                                                                    "
                                                                    label="Last Name"
                                                                ></v-text-field
                                                            ></v-col>
                                                        </v-row>
                                                        <v-row justify="center">
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                                ><v-text-field
                                                                    v-model="
                                                                        user.phone_number
                                                                    "
                                                                    :error-messages="
                                                                        formSignUpError.phone_number
                                                                    "
                                                                    :rules="
                                                                        rules.contactRules
                                                                    "
                                                                    prefix="(+63)"
                                                                    maxlength="10"
                                                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                                    label="Contact Number"
                                                                ></v-text-field
                                                            ></v-col>
                                                            <v-col
                                                                cols="12"
                                                                md="6"
                                                                ><v-text-field
                                                                    v-model="
                                                                        user.email
                                                                    "
                                                                    :error-messages="
                                                                        formSignUpError.email
                                                                    "
                                                                    :rules="
                                                                        rules.emailRules
                                                                    "
                                                                    label="Email"
                                                                ></v-text-field
                                                            ></v-col>
                                                        </v-row>
                                                        <v-row justify="center">
                                                            <v-col cols="12"
                                                                ><v-text-field
                                                                    v-model="
                                                                        user.referral_code
                                                                    "
                                                                    :error-messages="
                                                                        formSignUpError.referral_code
                                                                    "
                                                                    ><template
                                                                        v-slot:label
                                                                    >
                                                                        <div>
                                                                            Referral
                                                                            Code
                                                                            <small
                                                                                >(Optional)</small
                                                                            >
                                                                        </div>
                                                                    </template></v-text-field
                                                                ></v-col
                                                            >
                                                        </v-row>
                                                        <v-row justify="center">
                                                            <v-col cols="12"
                                                                ><v-text-field
                                                                    v-model="
                                                                        user.password
                                                                    "
                                                                    label="Password"
                                                                    id="password"
                                                                    name="password"
                                                                    :append-icon="
                                                                        visible
                                                                            ? 'mdi-eye-off'
                                                                            : 'mdi-eye'
                                                                    "
                                                                    @click:append="
                                                                        visible = !visible
                                                                    "
                                                                    :rules="
                                                                        rules.passwordRules
                                                                    "
                                                                    :type="
                                                                        visible
                                                                            ? 'text'
                                                                            : 'password'
                                                                    "
                                                                    @click="
                                                                        sendOTP(),
                                                                            (loader =
                                                                                'loading')
                                                                    "
                                                                ></v-text-field
                                                            ></v-col>
                                                        </v-row>
                                                        <v-row justify="center">
                                                            <v-col cols="12">
                                                                <v-btn
                                                                    color="primary"
                                                                    large
                                                                    block
                                                                    @click="
                                                                        sendOTP(),
                                                                            (loader =
                                                                                'loading')
                                                                    "
                                                                    class="ma-2"
                                                                    :loading="
                                                                        loading
                                                                    "
                                                                    :disabled="
                                                                        loading
                                                                    "
                                                                >
                                                                    Register
                                                                    <template
                                                                        v-slot:loader
                                                                    >
                                                                        <span
                                                                            class="custom-loader"
                                                                        >
                                                                            <v-icon
                                                                                light
                                                                                >mdi-cached</v-icon
                                                                            >
                                                                        </span>
                                                                    </template>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-form>
                                                </v-container>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
                <v-scroll-x-reverse-transition>
                    <v-row justify="center" v-show="e1 == 2">
                        <v-col cols="12" md="10" lg="8" xl="4"
                            ><v-container id="column-1">
                                <v-form id="otp" ref="form1" lazy-validation>
                                    <v-row justify="center" class="text-center">
                                        <h1
                                            class="font-weight-bold primary--text"
                                        >
                                            Account Verification
                                        </h1>
                                    </v-row>
                                    <v-row justify="center">
                                        <v-col cols="12" md="7" xl="10"
                                            ><p>
                                                Please enter the 6-digit
                                                verification code sent to +63{{
                                                    user.phone_number
                                                }}. The code is valid for 30
                                                minutes
                                            </p></v-col
                                        >
                                    </v-row>
                                    <v-row justify="center" no-gutters>
                                        <v-col
                                            md="7"
                                            xl="10"
                                            class="d-flex justify-content-between"
                                        >
                                            <span>SMS Verification Code</span>
                                            <span
                                                @click="sendOTP()"
                                                v-if="resend"
                                                ><strong> ReSend</strong></span
                                            >
                                            <span v-else>
                                                Resend in
                                                {{ countDown }}s</span
                                            >
                                        </v-col>
                                    </v-row>
                                    <v-row
                                        justify="center"
                                        style="margin-top: -12px;"
                                    >
                                        <v-col cols="12" md="7" xl="10">
                                            <v-otp-input
                                                ref="otpInput"
                                                class="d-flex justify-content-around my-5"
                                                input-classes="otp-input"
                                                separator="-"
                                                :num-inputs="6"
                                                :should-auto-focus="true"
                                                :is-input-num="true"
                                                @on-change="handleOnChange"
                                                @on-complete="handleOnComplete"
                                        /></v-col>
                                    </v-row>
                                </v-form> </v-container
                        ></v-col>
                    </v-row>
                </v-scroll-x-reverse-transition>
            </v-container>
            <div class="wrap hidden-sm-and-down">
                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="96.474"
                    height="82.692"
                    viewBox="0 0 96.474 82.692"
                >
                    <path
                        id="send"
                        d="M2,85.692,98.474,44.346,2,3V35.158l68.91,9.188L2,53.534Z"
                        transform="translate(-2 -3)"
                        fill="#fff"
                    />
                </svg>

                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="96.474"
                    height="82.692"
                    viewBox="0 0 96.474 82.692"
                >
                    <path
                        id="send"
                        d="M2,85.692,98.474,44.346,2,3V35.158l68.91,9.188L2,53.534Z"
                        transform="translate(-2 -3)"
                        fill="#fff"
                    />
                </svg>

                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="96.474"
                    height="82.692"
                    viewBox="0 0 96.474 82.692"
                >
                    <path
                        id="send"
                        d="M2,85.692,98.474,44.346,2,3V35.158l68.91,9.188L2,53.534Z"
                        transform="translate(-2 -3)"
                        fill="#fff"
                    />
                </svg>

                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="96.474"
                    height="82.692"
                    viewBox="0 0 96.474 82.692"
                >
                    <path
                        id="send"
                        d="M2,85.692,98.474,44.346,2,3V35.158l68.91,9.188L2,53.534Z"
                        transform="translate(-2 -3)"
                        fill="#fff"
                    />
                </svg>

                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="62.393"
                    height="95.441"
                    viewBox="0 0 62.393 95.441"
                >
                    <defs>
                        <linearGradient
                            id="linear-gradient"
                            x1="0.656"
                            y1="-0.211"
                            x2="-0.343"
                            y2="-0.211"
                            gradientUnits="objectBoundingBox"
                        >
                            <stop offset="0" stop-color="#fbac52" />
                            <stop offset="0.5" stop-color="#f87233" />
                            <stop offset="1" stop-color="#ed3624" />
                        </linearGradient>
                        <linearGradient
                            id="linear-gradient-2"
                            x1="0.662"
                            y1="-0.213"
                            x2="-0.337"
                            y2="-0.213"
                            xlink:href="#linear-gradient"
                        />
                        <linearGradient
                            id="linear-gradient-3"
                            x1="0.614"
                            y1="-0.164"
                            x2="-0.385"
                            y2="-0.164"
                            xlink:href="#linear-gradient"
                        />
                        <linearGradient
                            id="linear-gradient-4"
                            x1="-9.721"
                            y1="6.109"
                            x2="-9.721"
                            y2="7.074"
                            xlink:href="#linear-gradient"
                        />
                        <linearGradient
                            id="linear-gradient-5"
                            x1="0.335"
                            y1="-0.051"
                            x2="0.335"
                            y2="0.948"
                            xlink:href="#linear-gradient"
                        />
                    </defs>
                    <g
                        id="Layer_2"
                        data-name="Layer 2"
                        transform="translate(-0.009 0.038)"
                    >
                        <g
                            id="Logo_1"
                            data-name="Logo 1"
                            transform="translate(0.009 -0.038)"
                        >
                            <g id="Logo" transform="translate(0 0)">
                                <line
                                    id="Line_5"
                                    data-name="Line 5"
                                    y1="0.992"
                                    x2="22.228"
                                    transform="translate(18.73 79.53)"
                                    fill="#fff"
                                />
                                <path
                                    id="Path_11517"
                                    data-name="Path 11517"
                                    d="M230.884,1082.542a2.228,2.228,0,0,1-.112-.6,2.184,2.184,0,0,1,2.085-2.279l22.228-.993a2.184,2.184,0,1,1,.194,4.364l-22.228.993A2.184,2.184,0,0,1,230.884,1082.542Z"
                                    transform="translate(-214.223 -1001.323)"
                                    fill="url(#linear-gradient)"
                                />
                                <line
                                    id="Line_6"
                                    data-name="Line 6"
                                    y1="0.993"
                                    x2="22.227"
                                    transform="translate(19.163 85.733)"
                                    fill="#fff"
                                />
                                <path
                                    id="Path_11518"
                                    data-name="Path 11518"
                                    d="M236.9,1169.052a2.223,2.223,0,0,1-.112-.6,2.184,2.184,0,0,1,2.085-2.279l22.228-.994a2.184,2.184,0,1,1,.194,4.364l-22.228.993A2.185,2.185,0,0,1,236.9,1169.052Z"
                                    transform="translate(-219.812 -1081.63)"
                                    fill="url(#linear-gradient-2)"
                                />
                                <path
                                    id="Path_11519"
                                    data-name="Path 11519"
                                    d="M281.543,1246.82a7.386,7.386,0,0,1-7.441,6.036l-8.872-.215a7.385,7.385,0,0,1-6.78-4.9,1.706,1.706,0,0,0,.546.1c.044,0,.1-.012.148-.011l22.239-.99a.533.533,0,0,0,.161-.022Z"
                                    transform="translate(-239.919 -1157.417)"
                                    fill="url(#linear-gradient-3)"
                                />
                                <text
                                    id="D"
                                    transform="translate(29.32 25.285) rotate(11.56)"
                                    font-size="10"
                                    font-family="Pouttu"
                                >
                                    <tspan x="0" y="0">D</tspan>
                                </text>
                                <path
                                    id="Path_11520"
                                    data-name="Path 11520"
                                    d="M413.322,247.529a6.012,6.012,0,0,1,2.305,1.023,4.524,4.524,0,0,1,1.663,2.07,4.659,4.659,0,0,1,.179,2.662,4.854,4.854,0,0,1-1.124,2.34,4.485,4.485,0,0,1-2.1,1.306,5.037,5.037,0,0,1-2.45.1l-1.978-.405a1.577,1.577,0,0,1-1.227-1.858l1.3-6.336a1.577,1.577,0,0,1,1.859-1.227Zm-.667,3.078-.665,3.25.424.087a1.976,1.976,0,0,0,1.019-.061,1.459,1.459,0,0,0,.951-1.229,1.4,1.4,0,0,0-.526-1.506,2.853,2.853,0,0,0-1.167-.533Z"
                                    transform="translate(-379.264 -229.449)"
                                    fill="url(#linear-gradient-4)"
                                />
                                <path
                                    id="Path_11521"
                                    data-name="Path 11521"
                                    d="M51.829,54.55a12.566,12.566,0,0,0-4.379,9.116A12.311,12.311,0,0,1,34.842,75.682l-9.393-.225A12.311,12.311,0,0,1,13.43,62.848c.049-2.052,1.653-3.6,3.7-4.972a5.93,5.93,0,0,1,1-.57c2.17-1.119,7.5-5.007,9.1-10.623,0,0,.886-3.148,1.717-5.488l1.721,1.824L30.6,45.881a1.377,1.377,0,0,0-.837,1.259,1.4,1.4,0,1,0,2.808.067,1.425,1.425,0,0,0-.779-1.316l.08-3.33-.422-.442L29.4,39.963a7.356,7.356,0,0,1,.44-.944c.093-.143.151-.267.207-.355l1.324.374.158-.574a13.487,13.487,0,0,1,1.354.591,34.412,34.412,0,0,0,2.782-2.617,9.823,9.823,0,0,1,2.166,6.554,9.776,9.776,0,0,0,.111-9.307,21.539,21.539,0,0,0,3.518-7.012,18.415,18.415,0,0,0,.6-3.1l.049-.539a25.434,25.434,0,0,0,.068-2.862c-.022-.559-.063-1.1-.123-1.642A34.17,34.17,0,0,0,38.114,6.2a32.431,32.431,0,0,0-3.166,2.085,34.15,34.15,0,0,0-6.232,6.028c-.315.371-.594.778-.893,1.185a24.28,24.28,0,0,0-2.067,3.585c-.1.215-.191.43-.287.659a17.906,17.906,0,0,0-.8,2.274,21.7,21.7,0,0,0-.619,7.783,9.948,9.948,0,0,0-4.7,8.046,9.864,9.864,0,0,1,5.259-4.466,32.307,32.307,0,0,0,1.045,3.735,13.847,13.847,0,0,1,1.434.161l-.157.537,1.324.374a15.912,15.912,0,0,1-1.633,6.517L24.305,44l-.59-.176-3.083,1.637-.447-.875L17.3,46.12,18.836,49l2.882-1.534-.465-.86,2.609-1.4,2.092.645c-.151.248-.337.514-.523.779a15.97,15.97,0,0,1-3.686,3.513c-1.659,1.169-7.269,5.177-12.2,3.437C4.525,51.81,2.93,45.595,1.3,40.062A31.216,31.216,0,0,1,33.363.036,31.184,31.184,0,0,1,51.829,54.55Z"
                                    transform="translate(-0.009 0.038)"
                                    fill="url(#linear-gradient-5)"
                                />
                            </g>
                        </g>
                    </g>
                </svg>

                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="121.197"
                    height="106.048"
                    viewBox="0 0 121.197 106.048"
                >
                    <path
                        id="Icon_awesome-sms"
                        data-name="Icon awesome-sms"
                        d="M60.6,2.25C27.127,2.25,0,24.288,0,51.486,0,63.227,5.066,73.974,13.493,82.425,10.534,94.355.639,104.984.521,105.1a1.882,1.882,0,0,0-.355,2.059A1.854,1.854,0,0,0,1.894,108.3c15.694,0,27.459-7.528,33.282-12.167A72.192,72.192,0,0,0,60.6,100.723c33.471,0,60.6-22.038,60.6-49.236S94.07,2.25,60.6,2.25ZM30.347,66.636H27.459a1.9,1.9,0,0,1-1.894-1.894V60.955a1.9,1.9,0,0,1,1.894-1.894H30.37c1.42,0,2.462-.829,2.462-1.562a1.253,1.253,0,0,0-.5-.9l-5.184-4.45A8.75,8.75,0,0,1,24,45.5c0-5.042,4.5-9.137,10.037-9.137h2.888a1.9,1.9,0,0,1,1.894,1.894v3.787a1.9,1.9,0,0,1-1.894,1.894H34.016c-1.42,0-2.462.828-2.462,1.562a1.253,1.253,0,0,0,.5.9l5.184,4.45A8.75,8.75,0,0,1,40.383,57.5C40.407,62.541,35.886,66.636,30.347,66.636Zm45.4-1.894a1.9,1.9,0,0,1-1.894,1.894H70.067a1.9,1.9,0,0,1-1.894-1.894V48.6L62.3,61.807a1.891,1.891,0,0,1-3.385,0L53.024,48.6V64.742a1.9,1.9,0,0,1-1.894,1.894H47.343a1.9,1.9,0,0,1-1.894-1.894V40.124a3.8,3.8,0,0,1,3.787-3.787h3.787a3.769,3.769,0,0,1,3.385,2.083L60.6,46.8l4.19-8.38a3.8,3.8,0,0,1,3.385-2.083h3.787a3.8,3.8,0,0,1,3.787,3.787Zm11.433,1.894H84.27a1.9,1.9,0,0,1-1.894-1.894V60.955a1.9,1.9,0,0,1,1.894-1.894h2.912c1.42,0,2.462-.829,2.462-1.562a1.253,1.253,0,0,0-.5-.9l-5.184-4.45A8.75,8.75,0,0,1,80.814,45.5c0-5.042,4.5-9.137,10.037-9.137h2.888a1.9,1.9,0,0,1,1.894,1.894v3.787a1.9,1.9,0,0,1-1.894,1.894H90.827c-1.42,0-2.462.828-2.462,1.562a1.253,1.253,0,0,0,.5.9l5.184,4.45A8.75,8.75,0,0,1,97.195,57.5C97.218,62.541,92.721,66.636,87.182,66.636Z"
                        transform="translate(0 -2.25)"
                        fill="#fc6011"
                    />
                </svg>

                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="124.384"
                    height="98.708"
                    viewBox="0 0 124.384 98.708"
                >
                    <g
                        id="Icon_feather-mail"
                        data-name="Icon feather-mail"
                        transform="translate(1.874 -2.5)"
                    >
                        <path
                            id="Path_11513"
                            data-name="Path 11513"
                            d="M14.463,6h91.708a11.5,11.5,0,0,1,11.464,11.463V86.244a11.5,11.5,0,0,1-11.464,11.464H14.463A11.5,11.5,0,0,1,3,86.244V17.463A11.5,11.5,0,0,1,14.463,6Z"
                            fill="none"
                            stroke="#69bf68"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="7"
                        />
                        <path
                            id="Path_11514"
                            data-name="Path 11514"
                            d="M117.635,9,60.317,49.122,3,9"
                            transform="translate(0 8.464)"
                            fill="none"
                            stroke="#69bf68"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="7"
                        />
                    </g>
                </svg>

                <svg
                    class="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                >
                    <path
                        id="Icon_material-message"
                        data-name="Icon material-message"
                        d="M93,3H13A9.987,9.987,0,0,0,3.05,13L3,103,23,83H93a10.029,10.029,0,0,0,10-10V13A10.029,10.029,0,0,0,93,3ZM83,63H23V53H83Zm0-15H23V38H83Zm0-15H23V23H83Z"
                        transform="translate(-3 -3)"
                        fill="#d9aa40"
                    />
                </svg>
            </div>
        </div>
    </v-app>
</template>

<script>
export default {
    name: "app",

    data() {
        return {
            otp: undefined,
            resend: false,
            countDown: 0,
            loading: false,
            user: {
                first_name: null,
                last_name: null,
                email: null,
                plan_id: 1,
                referral_code: null,
                phone_number: null,
                password: null
            },
            visible: false,
            formSignUpError: {
                first_name: null,
                last_name: null,
                email: null,
                phone_number: null
            },
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
                    v => !!v || "Contact Number is required",
                    v =>
                        (!!v && v.length >= 10) ||
                        "Contact Number must be 11 characters",
                    v =>
                        (!!v && v.length < 11) ||
                        "Contact Number must not be more than 11 characters"
                ],
                passwordRules: [
                    v => !!v || "Password is required",
                    v =>
                        (!!v && v.length >= 8) ||
                        "Password must be more than 8 characters"
                ]
            },

            e1: 1,

            fab: null,
            color: "",
            flat: null
        };
    },

    methods: {
        handleOnComplete(value) {
            console.log("OTP completed: ", value);
            this.checkOTP(value);
        },

        checkOTP(code) {
            axios
                .get("/api/v1/verification/otp/check", {
                    params: {
                        phone_number: "0" + this.user.phone_number,
                        code: code
                    }
                })
                .then(response => {
                    // swal.fire({
                    //     position: "top-end",
                    //     toast: true,
                    //     type: "success",
                    //     icon: "success",
                    //     text: "OTP is Valid!",
                    //     showConfirmButton: false,
                    //     timer: 1500
                    // });

                    this.register(code);
                })
                .catch(error => {
                    if (error.response.data.message == "Unauthenticated.") {
                        sessionStorage.clear();
                        this.$router.push("/signin");
                        swal.fire(
                            "Error!",
                            error.response.data.message,
                            "error"
                        );
                    } else {
                        swal.fire("Please Enter a Valid Code!", error, "error");
                    }
                })
                .finally(x => {});
        },

        handleOnChange(value) {
            console.log("OTP changed: ", value);
        },

        sendOTP() {
            // this.e1 = 2;

            if (this.$refs.form.validate()) {
                axios
                    .post("/api/v1/registration/validate", {
                        ...this.user,
                        password_confirmation: this.user.password,
                        phone_number: "0" + this.user.phone_number
                    })
                    .then(response => {
                        axios
                            .get("/api/v1/verification/otp", {
                                params: {
                                    phone_number: "0" + this.user.phone_number
                                }
                            })
                            .then(response => {
                                swal.fire({
                                    position: "top-end",
                                    toast: true,
                                    type: "success",
                                    icon: "success",
                                    text: "OTP Sent!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                this.e1 = 2;
                                this.countDown = 40;
                                // Update the count down every 1 second
                                setInterval(() => {
                                    this.countDown = this.countDown - 1;
                                    if (this.countDown < 0) {
                                        this.resend = true;
                                    }
                                }, 1000);
                            })
                            .catch(error => {
                                if (
                                    error.response.data.message ==
                                    "Unauthenticated."
                                ) {
                                    sessionStorage.clear();
                                    this.$router.push("/signin");
                                    swal.fire(
                                        "Error!",
                                        error.response.data.message,
                                        "error"
                                    );
                                }
                                if (error.response.status == 422) {
                                    this.formSignUpError =
                                        error.response.data.errors;
                                    this.loading = false;
                                } else {
                                    swal.fire(
                                        "Invalid Credentials!",
                                        error,
                                        "error"
                                    );
                                }
                            })
                            .finally(x => {});
                    })
                    .catch(error => {
                        if (error.response.data.message == "Unauthenticated.") {
                            sessionStorage.clear();
                            this.$router.push("/signin");
                            swal.fire(
                                "Error!",
                                error.response.data.message,
                                "error"
                            );
                        }
                        if (error.response.status == 422) {
                            this.formSignUpError = error.response.data.errors;
                            this.loading = false;
                        } else {
                            swal.fire("Invalid Credentials!", error, "error");
                        }
                    })
                    .finally(x => {});
            }
        },

        register(code) {
            if (this.$refs.form.validate()) {
                this.loading = true;
                axios
                    .post("/api/v1/register", {
                        ...this.user,
                        password_confirmation: this.user.password,
                        phone_number: "0" + this.user.phone_number,
                        otp: code
                    })
                    .then(response => {
                        axios
                            .post("/api/v1/login", {
                                email: this.user.email,
                                password: this.user.password
                            })
                            .then(response => {
                                if (response.data.errors) {
                                    this.error = response.data.errors;
                                    return;
                                }
                                let token = response.data.token;
                                let user_id = response.data.id;
                                let profile_id = response.data.profile_id;
                                let profile_role = response.data.profile_role;
                                let user_type = response.data.role;

                                // Create a local storage item
                                sessionStorage.setItem("user-token", token);
                                sessionStorage.setItem("user-type", user_type);
                                sessionStorage.setItem("user-id", user_id);
                                sessionStorage.setItem(
                                    "profile-id",
                                    profile_id
                                );
                                sessionStorage.setItem(
                                    "profile-role",
                                    profile_role
                                );

                                // Echo.connector.pusher.config.auth.headers[
                                //     "Authorization"
                                // ] = "Bearer " + token;

                                // console.log(
                                //     Echo.connector.pusher.config.auth.headers[
                                //         "Authorization"
                                //     ]
                                // );

                                // Redirect user

                                swal.fire({
                                    position: "top-end",
                                    toast: true,
                                    type: "success",
                                    icon: "success",
                                    text: "Successfully Registered",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            })
                            .catch(error => {
                                if (
                                    error.response.data.message ==
                                    "Unauthenticated."
                                ) {
                                    sessionStorage.clear();
                                    this.$router.push("/signin");
                                    swal.fire(
                                        "Error!",
                                        error.response.data.message,
                                        "error"
                                    );
                                } else {
                                    swal.fire(
                                        "Invalid Credentials!",
                                        error,
                                        "error"
                                    );
                                }
                            })
                            .finally(x => {
                                this.$router.push("/dashboard");
                            });
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.formSignUpError = error.response.data.errors;
                            this.loading = false;
                        } else {
                            console.log(error);
                        }
                    })
                    .finally(x => {});
            }
        },

        onScroll(e) {
            if (typeof window === "undefined") return;
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 60;
        },

        toTop() {
            this.$vuetify.goTo(0);
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

    created() {
        this.toTop();
        const top = window.pageYOffset || 0;
        if (top <= 60) {
            this.color = "transparent";
            this.flat = true;
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

#otp {
    font-family: "Lexend", sans-serif !important;
}

#otp span {
    color: rgb(71, 77, 87) !important;
    font-weight: normal !important;
}

#otp span strong {
    color: #f59b21;
    font-weight: bold !important;
}

.otp-input {
    width: 50px;
    height: 50px;
    padding: 4px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    justify-content: center;
    align-content: center;
    border: 1px solid rgba(0, 0, 0, 0.3);
    font-family: "Lexend", sans-serif !important;
}

@media (max-width: 576px) {
    .otp-input {
        width: 40px;
        height: 40px;
        padding: 3px;
        margin: 0 5px;
        font-size: 17px;
        border-radius: 4px;
        justify-content: center;
        align-content: center;
        border: 1px solid rgba(0, 0, 0, 0.3);
        font-family: "Lexend", sans-serif !important;
    }
}

.error {
    border: 1px solid red !important;
}

input:focus.otp-input {
    outline: 2px solid #f59b21 !important;
}

/* textarea:focus,
input:focus {
    outline: none;
} */

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
