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
        // $images = [
        //     'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
        //     'https://mspoweruser.com/wp-content/uploads/2017/09/azure-1.png',
        //     'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
        //     'https://optimisticmommy.com/wp-content/uploads/2019/11/foodpanda-logo.png',
        //     'https://i.pcmag.com/imagery/reviews/050rKn2q3MpBjKwXSWAtfAn-7.fit_lpad.size_1050x590.jpg',
        //     'https://www.lavalamp.biz/wp-content/uploads/2019/02/laravel-logo-1024x683.jpg',
        //     'https://yb4ke1guf9g32qn4pnt1k17m-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/amazon.png'
        // ];

        $images = [
            'https://i.pinimg.com/originals/b9/cc/2a/b9cc2a4ef749653d769b5256a14535b5.jpg',
            'https://cdn.shopify.com/s/files/1/2955/7054/products/Calisthenics_Kit-Get_Ripped_Tools_1024x1024.jpg?v=1569444752',
            'https://i.pinimg.com/originals/f6/6b/7f/f66b7fb2951383da1011da6bcfbc948e.jpg',
            'https://unbreakablewt.weebly.com/uploads/8/2/5/9/82596570/2_orig.jpg',
            'https://bodydojo.com/wp-content/uploads/2018/05/IMG_20160620_144525.jpg',
            'https://m.media-amazon.com/images/I/61wwnZwBAqL._SR500,500_.jpg',
            'https://images.squarespace-cdn.com/content/v1/56b8b8efe707ebccc8b3c0d8/1567693260385-NRAGHI4TENMVYM9G6XZY/ke17ZwdGBToddI8pDm48kK60W-ob1oA2Fm-j4E_9NQB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0kD6Ec8Uq9YczfrzwR7e2Mh5VMMOxnTbph8FXiclivDQnof69TlCeE0rAhj6HUpXkw/IMG_6165.JPG',
            'https://images-na.ssl-images-amazon.com/images/I/713ebtcRnaL._SX425_.jpg',
            'https://www.titan.fitness/dw/image/v2/BDBZ_PRD/on/demandware.static/-/Sites-masterCatalog_Titan/default/dw8c92b2e0/images/hi-res/Fitness/410111_01.jpg?sw=1000&sh=1000'
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
