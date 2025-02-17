// seeders/imageSeeder.js
const mongoose = require('mongoose');
const Image = require('../models/imageModel');  // Adjust the path as needed
const MONGO_URI = "mongodb+srv://blissfulwed8:UInGWjPyu4aIffz4@cluster0.pezd8.mongodb.net/blissfulwedDB?retryWrites=true&w=majority&appName=Cluster0";

//
// Sample Image Data
const imageData = [
  {
    event: 'pre-wedding',
    filePath: 'https://plus.unsplash.com/premium_photo-1691030256235-47d75d5890b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwcHJlJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://media.weddingz.in/images/cdbb71e618db7b7f0f9aae4e631b9fbd/pre-wedding-photoshoot-for-family-indian-wedding-inspiration-weddingz-in21.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://static2.tripoto.com/media/filter/nl/img/522191/TripDocument/1529932991_pre_wedding_photo_indian_balpretin_pre_wedding_shoot_in_greenwich_park_jaypankhania_01_1800_x_1202.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://shaadiwish.com/blog/wp-content/uploads/2020/11/Real-Life-Couple-Pre-Wedding-Shoot.jpeg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://2sgphotography.in/wp-content/uploads/2021/06/Pre-wedding-1024x684.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'http://www.studiokelly.in/images/gallery/1488042825-1600.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://cameradia.com/wp-content/uploads/2022/01/pre-wedding-photosession-in-Athens5.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://www.honeymoonbug.com/blog/wp-content/uploads/2018/06/pre-wedding-photoshoot-in-Taj-Mahal-Agra1.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/originals/c3/b7/f6/c3b7f65c987b8fddeab1feddca7e1199.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'http://www.honeymoonbug.com/blog/wp-content/uploads/2018/06/pre-wedding-photoshoot-destinations-in-udaipur.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/736x/34/93/f3/3493f3a695c74f0d791886cdd577c545.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/736x/40/8b/57/408b57a4a940da0701fcaf6feb5de38f.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/736x/ec/60/83/ec608338cce49e42cd7672683527b3ac.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/736x/3d/a4/48/3da4484e77bc173fcc12c4f1a77c5970.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/736x/b8/dc/2a/b8dc2aa25721eb42fd59138ea2a048cb.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://www.maharaniweddings.com/media/gallery/55294-0569-AJ201508-DSC_6360.jpeg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://www.dkreatephotography.com/wp-content/uploads/2015/05/zinzuwadia-brothers_0009.jpg',
    category: 'couple'
  },

  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/originals/cb/a5/dd/cba5dd4d025204415930840832871d51.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://c.pxhere.com/images/97/43/d90df060e338d306232137f2b474-1598054.jpg!d',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i0.wp.com/shaadiwish.com/blog/wp-content/uploads/2021/10/pre-wedding-indian-dresses-840x1024.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://images.prismic.io/milanmagic/5cbdf90a-d2e1-4395-8bf0-389454d8a2ed_8.+crop+top+%26+long+skirt.jpg?auto=compress,format&rect=0,0,736,920&w=740&h=925',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://www.caleidoscope.in/wp-content/uploads/2018/02/Top-Pre-Wedding-Photo-Shoot-locations-in-India-Taj-Mahal-Agra.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'http://www.caleidoscope.in/wp-content/uploads/2018/02/Top-Pre-Wedding-Photo-Shoot-locations-in-India-Delhi.jpg',
    category: 'couple'
  },
  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/originals/16/dc/be/16dcbed01a1c5270455eea11431c9c7a.jpg',
    category: 'couple'
  },  {
    event: 'pre-wedding',
    filePath: 'https://i.pinimg.com/originals/df/83/69/df83690078d4726c28527267f82d3320.jpg',
    category: 'couple'
  },

  {
    event: 'wedding',
    filePath: 'https://images.squarespace-cdn.com/content/v1/578537f5cd0f68f8a7411561/1569002290085-NDGE7SVHVLV3XL9VJ4S6/Hyatt+Regency+Scottsdale.jpg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://www.masalaanews.com/wp-content/uploads/2016/08/20150118-VOWS-slide-Z2H2-superJumbo.jpg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'http://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_wedding_Delhi.jpg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://images.squarespace-cdn.com/content/v1/5585edeae4b042906e0cfd77/e182be90-1f1d-4d5d-8c7e-d8f28dfa3b2f/PBA01179-4363a2ce.jpeg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://images.shaadisaga.com/shaadisaga_production/photos/pictures/004/026/414/new_large/284912622_537363174599565_8313416739499186466_n.jpg?1654403346',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://www.brides.com/thmb/EfiphwaDycyfS6VTK0iAmUYd4vU=/1851x1228/filters:no_upscale():max_bytes(150000):strip_icc()/523-ce82f7d063bd4085ae36047750497f24.png',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://media-api.xogrp.com/images/72241d24-e14d-4cca-98a6-9af1d06b95cf~rs_768.h',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://irp.cdn-website.com/28cd0bb4/dms3rep/multi/hindu+wedding+attire.jpeg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://confettidaydreams.com/wp-content/uploads/2016/09/Traditional-Hindu-Wedding-Ceremony-61.jpg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://www.brides.com/thmb/EL5vQPqyNFVabsAGdzAXrcd-Gfc=/4200x2800/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__brides__public__brides-services__production__2017__07__21__5972548c2d361c201d0835a5_SarahandAshwain20170712_09-0231d625cb464c46bbc4583e02afc7cd-daa99fc5d7454d32a342389f14c67ae9.jpg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://www.weddingdetails.com/wp-content/uploads/2018/09/Wedding-Details-indian-wedd.jpg',
    category: 'ceremony'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/6a/de/76/6ade76688f22c4e25936e5ad9efe4e49.jpg',
    category: 'ceremony'
  },


  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/736x/1e/72/05/1e720578eded11ca5b4baee82b4b1b16.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/bf/ac/5b/bfac5b72b8f8497c8d052fd7c846c07c.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://www.k4fashion.com/wp-content/uploads/2022/09/A-Classy-Picture-Of-The-Gorgeous-Couple-With-Their-Parents-wedding-photos.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://d397bfy4gvgcdm.cloudfront.net/170881-0942.jpeg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://images.squarespace-cdn.com/content/v1/578537f5cd0f68f8a7411561/1586618367403-AHOASGCDC7MAMHNC9H74/Wedding+photographer.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://wbwp.s3.us-west-1.amazonaws.com/s3fs-public/photos/2019-11/classic-indian-wedding-family-portrait-worlds-best-wedding-photos-rimi-sen-bangalore-india-wedding-photographer-021.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://www.haringphotography.com/wp-content/uploads/2021/04/Indian-wedding-family-photos-color-ideas.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://d397bfy4gvgcdm.cloudfront.net/147624-Sheenika-Shah-Favorites-0017.jpeg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/00/bf/ed/00bfed6e8caf1e429fe70e499f9b0381.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://media2.insideweddings.com/images/HExwAYReIfXhZ2JU7cIH.width-1280.jpg',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/38/86/1a/38861a92af78da29bf2f8f8555c1acee.png',
    category: 'family'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/736x/ba/fd/a2/bafda2827f525c94abdaa372c7fd7b43.jpg',
    category: 'family'
  },


  {
    event: 'wedding',
    filePath: 'https://cdn0.weddingwire.com/article/9665/original/1280/jpg/5669-dove-weddings.jpeg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://d397bfy4gvgcdm.cloudfront.net/218631-DAY_03-173-orig.jpeg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'http://4.bp.blogspot.com/-4jTjQeNhbgg/TdtCflAA68I/AAAAAAAAANY/a7EMO6pTxPs/s1600/IMG_1193.JPG',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://img.freepik.com/free-photo/indian-wedding-guests_921049-1353.jpg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://www.brides.com/thmb/P_fjTvNNpjAauuiXN4N_2dKgHSs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MonisCorey-467_Mehndi-adfcfac6c7674fc59301cdcddf65df07.jpg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://www.brides.com/thmb/IN-nMrtQQjBDRHVzp7Uqp-4xgcs=/1425x0/filters:no_upscale():max_bytes(200000):strip_icc()/sq-b9164952526543af832abe53f26d2194.jpg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://www.brides.com/thmb/HmIfCk6xICNVoojW7eaUduTsgFQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/indian-wedding-guest-attire-Kristina-Adams-Photography-085498f7accb4d3d9d4b336632c47690.jpg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://symphonyevents.com.au/wp-content/uploads/2023/02/5667-olli-studio.jpeg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://www.brides.com/thmb/Y3yJxtd0-SppWGZussvbDS4Q7rE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/indian-wedding-guest-attire-Ivy-Weddings-d9028cc490e04f88b9f04034a5e45730.jpg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://getethnic.com/wp-content/uploads/2022/01/Client-Picture-47-Auckland-NZ-1.jpeg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://www.brides.com/thmb/10wdTjba5jic8Ld8JcWW5qwQaNg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/indian-wedding-guest-attire-recirc-Bruno-Rezza-b61675f010f54e2a8e262af42194df8d.jpg',
    category: 'guests'
  },
  {
    event: 'wedding',
    filePath: 'https://symphonyevents.com.au/wp-content/uploads/2023/02/JKHinduWeddingHighRes-643-2-scaled.jpg',
    category: 'guests'
  },

  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/69/60/ff/6960ff11f53bf71ccc69d5f5394432d9.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/23/50/0f/23500f94613e19a19b5c3b3af372aa47.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/ab/a0/96/aba096c8bb68e80909a400ec68e656f5.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/6d/d1/1e/6dd11ea58de829eb71f74cd8ca4c4e42.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/736x/40/6d/be/406dbec6fb1142911def1beba2e2cd63.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'http://www.dipakstudios.com/gallery/1535303839A36I7935-Edit.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/1c/c4/35/1cc435c9a0cf8a2d27245a2431901f9f.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://www.dipakstudios.com/gallery/1535304072JAV_4422.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://slawawalczak.com/wp-content/uploads/2018/12/Luxury-Indian-Wedding-Photography-London-Destination-8.jpg',
    category: 'couple'
  },
  {
    event: 'wedding',
    filePath: 'https://i.pinimg.com/originals/e4/26/da/e426dac4b48c83c7ec78a518dda58e84.jpg',
    category: 'couple'
  },

  {
    event: 'reception',
    filePath: 'https://blog.djriz.com/hs-fs/hubfs/Sarita-Souvik-MnMphotography-38.jpg?width=2048&name=Sarita-Souvik-MnMphotography-38.jpg',
    category: 'couple'
  },
  {
    event: 'reception',
    filePath: 'https://i.pinimg.com/originals/ae/87/43/ae8743105c03a4bb52c40786f0a9defd.jpg',
    category: 'couple'
  },
  {
    event: 'reception',
    filePath: 'https://i.pinimg.com/originals/25/74/65/257465e3176c58ef87b9d89fef72e5d0.jpg',
    category: 'couple'
  },
  {
    event: 'reception',
    filePath: 'https://www.alfaazphotography.com/wp-content/uploads/2023/03/Indian-wedding-photographers-Toronto-0026.jpg',
    category: 'couple'
  },

  {
    event: 'reception',
    filePath: 'https://jermainechandra.com/wp-content/uploads/2018/05/039-indian-wedding-reception-photography-london.jpg',
    category: 'guests'
  },
  {
    event: 'reception',
    filePath: 'https://i.ytimg.com/vi/0aSSQ7DUC34/maxresdefault.jpg',
    category: 'guests'
  },
  {
    event: 'reception',
    filePath: 'https://apis.xogrp.com/media-api/images/df33b59f-4253-11e7-b589-12072ec58d1a',
    category: 'guests'
  },
  {
    event: 'reception',
    filePath: 'http://www.maharaniweddings.com/wp-content/gallery/wd/indian-wedding-reception-guests-dancing.jpg',
    category: 'guests'
  },  {
    event: 'reception',
    filePath: 'https://i.pinimg.com/originals/61/b9/35/61b935b5f0057ba59c306ba62fc7bf52.jpg',
    category: 'guests'
  },


  {
    event: 'engagement',
    filePath: 'https://cdn.pixabay.com/photo/2018/11/29/19/42/ring-3846369_960_720.jpg',
    category: 'couple'
  },

  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/originals/ad/20/30/ad2030e80f9e8341d904da7c1671dbb1.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/originals/32/51/9a/32519ab209bf63d07cf3b556b6a8ccf9.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://wallpapers.com/images/hd/engagement-picture-iahycaqqb70310ih.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/originals/cf/3f/c8/cf3fc822aa73ca5e30218eb39219c9d0.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://5.imimg.com/data5/EO/ZT/RA/SELLER-27876720/ring-ceremony-photography-service-500x500.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/originals/76/fc/7a/76fc7a5f6795dbcc849c49cdc56b0980.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://www.shubhlaxmifilms.com/wp-content/uploads/2022/11/IMG_20220730_191230_587-scaled_11zon.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/17/b3/24/17b324f377ba4f2bf8476d9a77a91979.jpg',
    category: 'couple'
  },

  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/89/ae/25/89ae25528649f745625ff7b1db257450.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/55/b2/5a/55b25adbf98a269a1a30100cb631f8a0.jpg',
    category: 'couple'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/11/2c/cd/112ccd79611ab239d5dc447fbf8da3e3.jpg',
    category: 'couple'
  },

  {
    event: 'engagement',
    filePath: 'https://images.pexels.com/photos/19569597/pexels-photo-19569597/free-photo-of-people-throwing-petals-on-a-couple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'guests'
  },
  {
    event: 'engagement',
    filePath: 'https://images.pexels.com/photos/9392445/pexels-photo-9392445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'guests'
  },
  {
    event: 'engagement',
    filePath: 'https://images.pexels.com/photos/30146292/pexels-photo-30146292/free-photo-of-joyful-wedding-celebration-with-confetti-shower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'guests'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/ff/48/7d/ff487d3fd38bfe33b8a190de7f1aa70e.jpg',
    category: 'family'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/10/74/7f/10747f48be389058eb353c5e10d53971.jpg',
    category: 'family'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/5c/bb/3a/5cbb3af17ac90d0a43b277016ff10657.jpg',
    category: 'family'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/8e/d0/ef/8ed0eff5f609fdeeca2fd30dea9c69a2.jpg',
    category: 'family'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/4e/bc/b3/4ebcb3ce566c4b09995d3b5ccc5f76ae.jpg',
    category: 'family'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/41/39/7d/41397da180843f95b07f2e450c5ac5cc.jpg',
    category: 'family'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/91/49/4b/91494be812473034c07911066001866e.jpg',
    category: 'family'
  },
  {
    event: 'engagement',
    filePath: 'https://i.pinimg.com/736x/25/6c/b0/256cb0954af27defb1576f0427fcefa8.jpg',
    category: 'family'
  },
  
];

// Seed Function
const seedImages = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Image.deleteMany(); // Clear existing data
    await Image.insertMany(imageData); // Insert new data
    console.log('Image data seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding image data:', err);
    mongoose.connection.close();
  }
};

seedImages();