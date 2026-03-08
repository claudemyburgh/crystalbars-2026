<x-mail::message>
# Hi {{ $quote->name }},

Thank you for contacting Crystal Bars! Here is a response to your quote request:

{{ $replyMessage }}

<x-mail::panel>
### Your Original Message:
{{ $quote->message['text'] }}
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
