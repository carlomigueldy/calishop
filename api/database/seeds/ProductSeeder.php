<?php

use App\Product;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $totalProducts = 100;
        $categories = [
            'equipment',
            'gear',
            'apparel',
            'miscellaneous'
        ];
        $images = [
            'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
            'https://mspoweruser.com/wp-content/uploads/2017/09/azure-1.png',
            'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
            'https://optimisticmommy.com/wp-content/uploads/2019/11/foodpanda-logo.png',
        ];

        foreach (range(1, $totalProducts) as $key => $value) {
            $product = Product::create([
                "name" => $faker->company." Merch",
                "category" => $categories[array_rand($categories)],
                "small_description" => $faker->catchPhrase,
                "description" => $faker->realText($maxNbChars = 200, $indexSize = 2),
                "price" => $faker->randomFloat($nbMaxDecimals = NULL, $min = 50, $max = 300)
            ]);

            $product->addMediaFromUrl($images[array_rand($images)])->toMediaCollection();
        }
        
    }
}
