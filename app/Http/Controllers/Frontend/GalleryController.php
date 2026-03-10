<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Gallery;
use App\Models\GalleryGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class GalleryController
{
    public function __invoke(Request $request): Response
    {
        $groups = GalleryGroup::whereIn('slug', ['crystal-bars', 'trellis-gates'])->pluck('id', 'slug');

        $galleries = Gallery::with('media')
            ->whereIn('gallery_group_id', $groups->values())
            ->orderBy('gallery_group_id')
            ->orderBy('order_column')
            ->get();

        $images = $galleries->map(function ($gallery) use ($groups) {
            $media = $gallery->getFirstMedia('images');
            $groupSlug = $groups->search($gallery->gallery_group_id);

            return [
                'id' => $gallery->id,
                'group' => $groupSlug,
                'url' => $media ? $media->getUrl('large') : null,
                'thumbnail' => $media ? $media->getUrl('medium') : null,
                'original' => $media ? $media->getUrl() : null,
                'name' => $media ? $media->name : 'Gallery Image',
                'order' => $gallery->order_column,
            ];
        })->filter(fn ($image) => $image['url'] !== null)->values();

        return Inertia::render('frontend/gallery', [
            'images' => $images,
        ]);
    }
}
