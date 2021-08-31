{{-- <div style="font-weight: bold;">Message</div>
<div>{{ $message }}</div> --}}

<hr />
<div style="font-weight: bold;">User Information</div>
<div>Email: {{ $subscriber['user']['email'] }}</div>

<hr />
<div style="font-weight: bold;">Subscriber Information</div>
<div>First Name: {{ $subscriber['first_name'] }}</div>
<div>Last Name: {{ $subscriber['last_name'] }}</div>
<div>Phone Number: {{ $subscriber['phone_number'] }}</div>

<hr />
<div style="font-weight: bold;">Plan</div>
<div>From: {{ $plan['from']['name'] }} (Php {{ $plan['from']['fee'] }})</div>
<div>To: {{ $plan['to']['name'] }} (Php {{ $plan['to']['fee'] }})</div>
<div>Sender ID: {{ $plan['sender_id'] }}</div>

<hr />
@if ($voucher)
    <div style="font-weight: bold;">Voucher</div>
    <div>Type: {{ $voucher['type'] ?? null }}</div>
    <div>Value: {{ $voucher['value'] ?? null }}</div>
    <div>From: {{ $voucher['from'] ?? null }} - To: {{ $voucher['to'] ?? null }}</div>
@endif

