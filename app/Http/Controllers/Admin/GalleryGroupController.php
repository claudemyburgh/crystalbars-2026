<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryGroup;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class GalleryGroupController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/gallery/index', [
            'groups' => GalleryGroup::withCount('galleries')->get(),
        ]);
    }

    public function show(GalleryGroup $galleryGroup): Response
    {
        return Inertia::render('admin/gallery/show', [
            'group' => $galleryGroup->load(['galleries.media']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        GalleryGroup::create($validated);

        return redirect()->back()->with('success', 'Gallery group created successfully.');
    }

    public function update(Request $request, GalleryGroup $galleryGroup): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $galleryGroup->update($validated);

        return redirect()->back()->with('success', 'Gallery group updated successfully.');
    }

    public function destroy(GalleryGroup $galleryGroup): RedirectResponse
    {
        $galleryGroup->delete();

        return redirect()->route('admin.gallery-groups.index')->with('success', 'Gallery group deleted successfully.');
    }

    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:gallery_groups,id',
        ]);

        // Fetch and loop to ensure model events are fired if necessary
        $groups = GalleryGroup::whereIn('id', $validated['ids'])->get();
        foreach ($groups as $group) {
            $group->delete();
        }

        return redirect()->back()->with('success', 'Gallery groups deleted successfully.');
    }
}
