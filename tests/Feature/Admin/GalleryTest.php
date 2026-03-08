<?php

namespace Tests\Feature\Admin;

use App\Models\Gallery;
use App\Models\GalleryGroup;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view gallery group list', function () {
    $admin = User::factory()->create();
    $group = GalleryGroup::create(['name' => 'Trellis', 'slug' => 'trellis']);

    $this->actingAs($admin)
        ->get(route('admin.gallery-groups.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/gallery/index')
            ->has('groups', 1)
        );
});

test('admin can create a gallery group', function () {
    $admin = User::factory()->create();

    $this->actingAs($admin)
        ->post(route('admin.gallery-groups.store'), [
            'name' => 'New Group',
        ])
        ->assertRedirect()
        ->assertSessionHas('success', 'Gallery group created successfully.');

    expect(GalleryGroup::where('name', 'New Group')->exists())->toBeTrue();
});

test('admin can view a gallery group', function () {
    $admin = User::factory()->create();
    $group = GalleryGroup::create(['name' => 'Trellis', 'slug' => 'trellis']);

    $this->actingAs($admin)
        ->get(route('admin.gallery-groups.show', $group))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/gallery/show')
            ->has('group', fn (Assert $prop) => $prop
                ->where('name', $group->name)
                ->etc()
            )
        );
});

test('admin can upload images to a group', function () {
    Storage::fake('public');

    $admin = User::factory()->create();
    $group = GalleryGroup::create(['name' => 'Trellis', 'slug' => 'trellis']);

    $file1 = UploadedFile::fake()->image('image1.jpg');
    $file2 = UploadedFile::fake()->image('image2.jpg');

    $this->actingAs($admin)
        ->post(route('admin.gallery-groups.upload', $group), [
            'images' => [$file1, $file2],
        ])
        ->assertRedirect()
        ->assertSessionHas('success', 'Images uploaded successfully.');

    expect($group->galleries()->count())->toBe(2);
});

test('admin can delete a gallery item', function () {
    $admin = User::factory()->create();
    $group = GalleryGroup::create(['name' => 'Trellis', 'slug' => 'trellis']);
    $item = Gallery::create(['gallery_group_id' => $group->id]);

    $this->actingAs($admin)
        ->delete(route('admin.gallery-items.destroy', $item))
        ->assertRedirect()
        ->assertSessionHas('success', 'Image deleted successfully.');

    expect(Gallery::find($item->id))->toBeNull();
});

test('admin can reorder gallery items', function () {
    $admin = User::factory()->create();
    $group = GalleryGroup::create(['name' => 'Trellis', 'slug' => 'trellis']);
    $item1 = Gallery::create(['gallery_group_id' => $group->id, 'order_column' => 1]);
    $item2 = Gallery::create(['gallery_group_id' => $group->id, 'order_column' => 2]);

    $this->actingAs($admin)
        ->post(route('admin.gallery-groups.reorder', $group), [
            'order' => [$item2->id, $item1->id],
        ])
        ->assertRedirect()
        ->assertSessionHas('success', 'Images reordered successfully.');

    expect($item1->fresh()->order_column)->toBeGreaterThan($item2->fresh()->order_column);
});

test('admin can bulk delete gallery items', function () {
    $admin = User::factory()->create();
    $group = GalleryGroup::create(['name' => 'Trellis', 'slug' => 'trellis']);
    $item1 = Gallery::create(['gallery_group_id' => $group->id]);
    $item2 = Gallery::create(['gallery_group_id' => $group->id]);
    $item3 = Gallery::create(['gallery_group_id' => $group->id]);

    $this->actingAs($admin)
        ->post(route('admin.gallery-items.bulk-destroy'), [
            'ids' => [$item1->id, $item2->id],
        ])
        ->assertRedirect()
        ->assertSessionHas('success', 'Selected images deleted successfully.');

    expect(Gallery::find($item1->id))->toBeNull();
    expect(Gallery::find($item2->id))->toBeNull();
    expect(Gallery::find($item3->id))->not->toBeNull();
});
