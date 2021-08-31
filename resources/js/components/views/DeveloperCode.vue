<template>
    <v-app>
        <v-container id="documentation">
            <v-row
                justify="center"
                :class="{
                    'mt-6': $vuetify.breakpoint.xs,
                    'mt-3': $vuetify.breakpoint.mdAndUp
                }"
            >
                <v-col cols="12" md="8">
                    <v-row class="mt-12">
                        <p class="headline font-weight-bold">Getting Started</p>
                        <!-- <p class="">
                            *Default Sender name will be TXTBOX. To use your own
                            custom sender name, here is how to request your
                            sender name.
                        </p> -->
                        <v-divider class="mt-6"></v-divider>
                        <p class="headline font-weight-bold">
                            Using SMSOn API
                        </p>
                        <p class="">API Request:</p>

                        <div>
                            <v-chip
                                color="success"
                                style="display: inline-block;"
                                >POST</v-chip
                            >
                            <p
                                class="error--text"
                                style="display: inline-block;"
                            >
                                https://www.smson.ph/api/v1/send-sms
                            </p>
                        </div>
                        <p class="">Header:</p>
                        <pre><code class="HTTP p-3 mb-0 hljs"><span class="hljs-attribute">SmsOn-Auth</span>:  { email:password in base64 format }
</code></pre>
                        <pre><code class="HTTP p-3 mb-0 hljs"><span class="hljs-attribute">SmsOn-ApiKey</span>: {{this.subscriber.api_key ? this.subscriber.api_key : '{PROJECT_API_KEY}'}}</code></pre>
                        <p class="">Body:</p>
                        <table
                            class="mt-2 mb-1 table table-sm table-bordered table-striped w-100"
                        >
                            <thead>
                                <tr>
                                    <th
                                        class="text-uppercase text-primary font-weight-bold"
                                        scope="col"
                                    >
                                        Field
                                    </th>
                                    <th
                                        class="text-uppercase text-primary font-weight-bold"
                                        scope="col"
                                    >
                                        Type
                                    </th>
                                    <th
                                        class="text-uppercase text-primary font-weight-bold"
                                        scope="col"
                                    >
                                        Description
                                    </th>
                                    <th
                                        class="text-uppercase text-primary font-weight-bold hidden-sm-and-down"
                                        scope="col"
                                    >
                                        Filters
                                    </th>
                                    <th
                                        class="text-uppercase text-primary font-weight-bold"
                                        scope="col"
                                    >
                                        Is Required
                                    </th>
                                    <th
                                        class="text-uppercase text-primary font-weight-bold hidden-sm-and-down"
                                        scope="col"
                                    >
                                        Sample
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>message</td>
                                    <td>String</td>
                                    <td>The content of the message.</td>
                                    <td class="hidden-sm-and-down">
                                        Max of 125 characters
                                    </td>
                                    <td>Yes</td>
                                    <td class="hidden-sm-and-down">
                                        Hello from SMSOn!
                                    </td>
                                </tr>
                                <tr>
                                    <td>phone_number</td>
                                    <td>String</td>
                                    <td>The number of the recipient.</td>
                                    <td class="hidden-sm-and-down">
                                        RegEx: ^(09|\+639)\d{9}$
                                    </td>
                                    <td>Yes</td>
                                    <td class="hidden-sm-and-down">
                                        09999999999 | +639999999999
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <v-divider class="mt-6"></v-divider>
                        <p class="headline font-weight-bold">
                            Examples
                        </p>
                        <v-tabs
                            v-model="tab"
                            background-color="transparent"
                            grow
                        >
                            <v-tab v-for="item in items" :key="item.id">
                                {{ item.language }}
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="item in items" :key="item.id">
                                <v-card flat>
                                    <v-card-text v-html="item.code">
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
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
            profileId: sessionStorage.getItem("profile-id"),
            subscriber: {
                api_key: ""
            },
            tab: null,
            items: []
        };
    },

    created() {
        this.fetchSubscriber();
    },

    methods: {
        fetchSubscriber() {
            axios
                .get("/api/v1/subscribers/" + this.profileId)
                .then(response => {
                    this.subscriber = response.data;
                    console.log(this.subscriber);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.items = [
                        {
                            id: 1,
                            language: "PHP",
                            code: `<pre>
<code class="PHP p-3 mb-0 hljs">
<span class="hljs-meta">&lt;?php</span>

        $curl = curl_init();

        curl_setopt_array($curl, <span class="hljs-keyword">array</span>(
        CURLOPT_URL =&gt; <span class="hljs-string">"https://www.smson.ph/api/v1/send-sms"</span>,
        CURLOPT_RETURNTRANSFER =&gt; <span class="hljs-keyword">true</span>,
        CURLOPT_ENCODING =&gt; <span class="hljs-string">""</span>,
        CURLOPT_MAXREDIRS =&gt; <span class="hljs-number">10</span>,
        CURLOPT_TIMEOUT =&gt; <span class="hljs-number">0</span>,
        CURLOPT_FOLLOWLOCATION =&gt; <span class="hljs-keyword">false</span>,
        CURLOPT_HTTP_VERSION =&gt; CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST =&gt; <span class="hljs-string">"POST"</span>,
        CURLOPT_POSTFIELDS =&gt; <span class="hljs-keyword">array</span>(<span class="hljs-string">'message'</span> =&gt; <span class="hljs-string">'Hello from SmsOn!'</span>,<span class="hljs-string">'phone_number'</span> =&gt; <span class="hljs-string">'09051406888'</span>),
        CURLOPT_HTTPHEADER =&gt; <span class="hljs-keyword">array</span>(
            <span class="hljs-string">"SmsOn-Auth: email:password combination in base64"</span>
            <span class="hljs-string">"SmsOn-ApiKey: ${this.subscriber.api_key}</span>
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        <span class="hljs-keyword">if</span> ($err) {
            <span class="hljs-keyword">echo</span> <span class="hljs-string">"cURL Error #:"</span> . $err;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">echo</span> $response;
        }
<span class="hljs-meta">?&gt;</span>
</code>
</pre>`
                        },
                        {
                            id: 2,
                            language: "Node",
                            code: `<pre><code class="Javascript p-3 mb-0 hljs">
<span class="hljs-keyword">var</span> https = <span class="hljs-built_in">require</span>(<span class="hljs-string">'https'</span>);

<span class="hljs-keyword">var</span> options = {
  <span class="hljs-string">'method'</span>: <span class="hljs-string">'POST'</span>,
  <span class="hljs-string">'hostname'</span>: <span class="hljs-string">'www.smson.ph'</span>,
  <span class="hljs-string">'path'</span>: <span class="hljs-string">'/api/v1/send-sms'</span>,
  <span class="hljs-string">'headers'</span>: {
    <span class="hljs-string">'SmsOn-Auth'</span>: email:password combination in base64
    <span class="hljs-string">'SmsOn-ApiKey'</span>: ${this.subscriber.api_key}
  }
};

<span class="hljs-keyword">var</span> req = https.request(options, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
  <span class="hljs-keyword">var</span> chunks = [];

  res.on(<span class="hljs-string">"data"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk</span>) </span>{
    chunks.push(chunk);
  });

  res.on(<span class="hljs-string">"end"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk</span>) </span>{
    <span class="hljs-keyword">var</span> body = Buffer.concat(chunks);
    <span class="hljs-built_in">console</span>.log(body.toString());
  });

  res.on(<span class="hljs-string">"error"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.error(error);
  });
});

<span class="hljs-keyword">var</span> postData = <span class="hljs-string">'------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="message"

Hello from SmsOn!
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="phone_number"

09051406888
------WebKitFormBoundary7MA4YWxkTrZu0gW--'</span>;

req.setHeader(<span class="hljs-string">'content-type'</span>, <span class="hljs-string">'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'</span>);

req.write(postData);

req.end();
</code></pre>`
                        },
                        {
                            id: 3,
                            language: "Python",
                            code: `<pre><code class="Python p-3 mb-0 hljs">
<span class="hljs-keyword">import</span> requests
url = <span class="hljs-string">'https://www.smson.ph/api/v1/send-sms'</span>
payload = {<span class="hljs-string">'message'</span>: <span class="hljs-string">'Hello from SmsOn!'</span>,
<span class="hljs-string">'phone_number'</span>: <span class="hljs-string">'09051406888'</span>}
files = {}
headers = {
  <span class="hljs-string">'SmsOn-Auth'</span>: email:password combination in base64,
  <span class="hljs-string">'SmsOn-ApiKey'</span>: ${this.subscriber.api_key}
}
response = requests.request(<span class="hljs-string">'POST'</span>, url, headers = headers, data = payload, files = files, allow_redirects=<span class="hljs-literal">False</span>, timeout=undefined, allow_redirects=false)
print(response.text)
</code></pre>`
                        },
                        {
                            id: 4,
                            language: "Ruby",
                            code: `<pre><code class="Ruby p-3 mb-0 hljs">
<span class="hljs-keyword">require</span> <span class="hljs-string">"uri"</span>
<span class="hljs-keyword">require</span> <span class="hljs-string">"net/http"</span>

url = URI(<span class="hljs-string">"https://www.smson.ph/api/v1/send-sms"</span>)

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = <span class="hljs-literal">true</span>

request = Net::HTTP::Post.new(url)
request[<span class="hljs-string">"SmsOn-Auth"</span>] = email:password combination in base64
request[<span class="hljs-string">"SmsOn-ApiKey"</span>] = ${this.subscriber.api_key}
request[<span class="hljs-string">"content-type"</span>] = <span class="hljs-string">'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'</span>
request.body = <span class="hljs-string">'------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="message"

Hello from SmsOn!
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="phone_number"

09051406888
------WebKitFormBoundary7MA4YWxkTrZu0gW--'</span>

response = https.request(request)
puts response.read_body
</code></pre>`
                        },
                        {
                            id: 5,
                            language: "jQuery",
                            code: `<pre><code class="Javascript p-3 mb-0 hljs">
<span class="hljs-keyword">var</span> form = <span class="hljs-keyword">new</span> FormData();
form.append(<span class="hljs-string">"message"</span>, <span class="hljs-string">"Hello from SmsOn!"</span>);
form.append(<span class="hljs-string">"phone_number"</span>, <span class="hljs-string">"09051406888"</span>);

<span class="hljs-keyword">var</span> settings = {
  <span class="hljs-string">"url"</span>: <span class="hljs-string">"https://www.smson.ph/api/v1/send-sms"</span>,
  <span class="hljs-string">"method"</span>: <span class="hljs-string">"POST"</span>,
  <span class="hljs-string">"timeout"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-string">"headers"</span>: {
    <span class="hljs-string">"SmsOn-Auth"</span>: email:password combination in base64,
    <span class="hljs-string">"SmsOn-ApiKey"</span>: ${this.subscriber.api_key}
  },
  <span class="hljs-string">"processData"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"mimeType"</span>: <span class="hljs-string">"multipart/form-data"</span>,
  <span class="hljs-string">"contentType"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"data"</span>: form
};
$.ajax(settings).done(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(response);
});
</code></pre>`
                        },
                        {
                            id: 6,
                            language: "Dart",
                            code: `<pre><code class="Javascript p-3 mb-0 hljs">
<span class="hljs-keyword">var</span> headers = {
  <span class="hljs-string">"SmsOn-Auth"</span>: <span class="hljs-string">"email:password combination in base64"</span>,
  <span class="hljs-string">"SmsOn-ApiKey"</span>: <span class="hljs-string">"${this.subscriber.api_key}</span>
};

<span class="hljs-keyword">var</span> request = http.MultipartRequest(<span class="hljs-string">"POST"</span>, Uri.parse(<span class="hljs-string">"https://www.smson.ph/api/v1/send-sms"</span>));
request.fields.addAll({
  <span class="hljs-string">"phone_number"</span>: <span class="hljs-string">"09051406888"</span> ,
  <span class="hljs-string">"message"</span>: <span class="hljs-string">"Hello from SmsOn!"</span>,
});

request.headers.addAll(headers);

http.StreamedResponse response = await request.send();

<span class="hljs-keyword">if</span> (response.statusCode == <span class="hljs-number">200</span>) {
  print(await response.stream.bytesToString());
}
<span class="hljs-keyword">else</span> {
  print(response.reasonPhrase);
}
</code></pre>`
                        }
                    ];
                    this.tableLoading = false;
                    this.componentOverlay = false;
                });
        }
    }
};
</script>
