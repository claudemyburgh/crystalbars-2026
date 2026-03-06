<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Can I install it on any type of window?',
                'answer' => 'Wood, Aluminium, Steel and PVC Windows, are all the windows that we can install the clear bars to.',
            ],
            [
                'question' => 'How are the polycarbonate burglar bars fixed to the windows?',
                'answer' => 'Burglar bars are mounted to your window frames, unless you have sliding windows, we use aluminium square tubing the same colour as your frames for support.',
            ],
            [
                'question' => 'How do I go about getting a quote?',
                'answer' => 'If you already have your window sizes you can mail them to us for a quote, or we will come to your house and take all the window measurements for you. Get a quote via the Quote page.',
            ],
            [
                'question' => 'How long from accepting the quote to installation?',
                'answer' => 'Normally 2-3 days before installation.',
            ],
            [
                'question' => 'Can you cut the bars?',
                'answer' => 'Yes, you can cut the bars with a grinder but so can any burglar bar that you install.',
            ],
            [
                'question' => 'Can you burn the burglar bars?',
                'answer' => 'The bars need a tremendous amount of heat to be burnt and polycarbonate is flame-retardant, and it extinguishes itself as it is being burnt. So yes, it can be melted with very high heat, like a blue flame but it will be time-consuming.',
            ],
            [
                'question' => 'What guarantee do you give?',
                'answer' => 'Burglar bars are guaranteed not to fade or discolour in direct sunlight for 10 years as they are UV protective. We also offer a one-year workmanship guarantee.',
            ],
            [
                'question' => 'How do you keep the burglar bars clean?',
                'answer' => 'Use soapy water and a soft microfibre cloth, no strong chemicals or ammonia-based cleaning chemicals as they damage the bars making them discolour.',
            ],
            [
                'question' => 'Do insurance companies accept clear burglar bars?',
                'answer' => 'Yes, always check with your insurance company before installation as their policies do differ.',
            ],
            [
                'question' => 'Are the polycarbonate burglar bars expensive?',
                'answer' => 'The polycarbonate bars are more cost-effective than the traditional metal burglar bars and the turnaround time from quote to installation is by far the fastest.',
            ],
            [
                'question' => 'Any maintenance on the burglar bars?',
                'answer' => 'No maintenance, bars will never rust or need painting.',
            ],
            [
                'question' => 'What is the difference between "crystal bars", "clear view bars" and "transparent bars”?',
                'answer' => 'Nothing: Crystal Bars is just the name of our company and what we like to refer to as our product. Other company just name their product crystal bars due to the popularity of our company brand.',
            ],
            [
                'question' => 'How long will it take to install the transparent burglar bars?',
                'answer' => 'No longer than one working day. For the average home size, it may take 1 to 3 hours to install your transparent burglar bars.',
            ],
        ];

        foreach ($faqs as $i => $data) {
            Faq::query()->updateOrCreate(
                ['question' => $data['question']],
                [
                    'answer' => $data['answer'],
                    'sort_order' => $i + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
