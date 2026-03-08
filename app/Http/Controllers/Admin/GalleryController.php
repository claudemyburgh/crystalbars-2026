<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function upload(Request $request, GalleryGroup $galleryGroup): RedirectResponse
    {
        $request->validate([
            'images' => ['required', 'array'],
            'images.*' => ['required', 'image', 'max:5120'], // 5MB limit
        ]);

        foreach ($request->file('images') as $image) {
            $gallery = Gallery::create([
                'gallery_group_id' => $galleryGroup->id,
            ]);

            $gallery->addMedia($image)->toMediaCollection('images');
        }

        return redirect()->back()->with('success', 'Images uploaded successfully.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $gallery->delete();

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['exists:galleries,id'],
        ]);

        Gallery::whereIn('id', $request->ids)->delete();

        return redirect()->back()->with('success', 'Selected images deleted successfully.');
    }

    public function reorder(Request $request, GalleryGroup $galleryGroup): RedirectResponse
    {
        $request->validate([
            'order' => ['required', 'array'],
            'order.*' => ['required', 'integer', 'exists:galleries,id'],
        ]);

        Gallery::setNewOrder($request->input('order'));

        return redirect()->back()->with('success', 'Images reordered successfully.');
    }
}
