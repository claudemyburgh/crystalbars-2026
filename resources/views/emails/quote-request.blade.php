<x-mail::message>
# New Quote Request

You have received a new quote request.

**Name:** {{ $data['name'] }}

**Email:** {{ $data['email'] }}

**Phone:** {{ $data['phone'] }}


**Message:**
<x-mail::panel>
{{ $data['message'] }}
</x-mail::panel>

@if(isset($data['windows']) && count($data['windows']) > 0)
## Window/Trellis Details

<x-mail::table>
| Type          | Height (mm) | Drop (mm) | Quantity |
|:--------------|:------------|:----------|:---------|
@foreach($data['windows'] as $window)
| {{ ucwords(str_replace('-', ' ', $window['type'])) }} | {{ $window['height'] }} | {{ $window['drop'] }} | {{ $window['quantity'] }} |
@endforeach
</x-mail::table>
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
