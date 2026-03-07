<x-mail::message>
# New Quote Request

You have received a new quote request.

**Name:** {{ $data['name'] }}
**Email:** {{ $data['email'] }}
@if($data['phone'])
**Phone:** {{ $data['phone'] }}
@endif

**Message:**
<x-mail::panel>
{{ $data['message'] }}
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
