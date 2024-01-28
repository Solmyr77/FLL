<script>
class Video {
   constructor(videoData) {
      this.id = this.extractId(videoData.url);
      this.videoUrl = `https://www.youtube.com/embed/${this.id}`;
      this.title = videoData.title;
      this.description = videoData.description;
   }

   extractId(url) {
      const urlParts = url.split("v=");
      const idPart = urlParts[1];
      return idPart ? idPart.split("&")[0] : "";
   }
}

export default {
   data() {
      return {
         videoData: [
            {
               url: "https://www.youtube.com/watch?v=3aOTj2pt_3w",
               title: "Custom Title 1",
               description: "Custom description for Video 1",
            },
            {
               url: "https://www.youtube.com/watch?v=SvOZfxIMMzg",
               title: "Custom Title 2",
               description: "Custom description for Video 2",
            },
            {
               url: "https://www.youtube.com/watch?v=w3VQB7dTFoM",
               title: "Custom Title 3",
               description: "Custom description for Video 3",
            },
            {
               url: "https://www.youtube.com/watch?v=xE5uPvUk3vI",
               title: "Custom Title 4",
               description: "Custom description for Video 4",
            },
            {
               url: "https://www.youtube.com/watch?v=f53DVwwAzaE",
               title: "Custom Title 5",
               description: "Custom description for Video 5",
            },
            {
               url: "https://www.youtube.com/watch?v=3z_MsL_JpL0",
               title: "Custom Title 6",
               description: "Custom description for Video 6",
            },
         ],
         videos: [],
      };
   },
   mounted() {
      this.generateObjects();
   },
   methods: {
      generateObjects() {
         this.videos = this.videoData.map((data) => new Video(data));
      },
   },
};
</script>

<template>
   <!--Phone screen-->
   <div class="flex flex-col min-h-screen h-full w-full lg:hidden">
      <div class="grid grid-rows-4 h-80 w-full bg-richblack text-platinum">

         <div class="flex justify-center items-center h-full w-full">
               <p class="text-6xl">FLL</p>
         </div>

         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue">
            <a class="text-2xl" href="#">Menüpont</a>
         </div>
         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue">
            <a class="text-2xl" href="#">Menüpont</a>
         </div>
         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue">
            <a class="text-2xl" href="#">Menüpont</a>
         </div>

      </div>

      <div class="flex flex-wrap flex-grow overflow-y-auto w-full h-full bg-oxfordblue">
         <div v-for="video in videos" class="flex flex-col w-full h-auto video-card items-center mt-5">
            <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
               <div class="flex justify-center items-center h-full w-full basis-3/4">
                  <iframe class="w-93p h-90p rounded-3xl" :src="video.videoUrl"></iframe>
               </div>

               <div class="flex justify-center items-center h-full w-full basis-1/4">
                  <div class="flex flex-col justify-center items-center rounded-3xl bg-silverlakeblue h-90p w-93p mb-5">
                     <div class="flex justify-center items-center">
                        <p class="text-3xl">
                           {{ video.title }}
                        </p>
                     </div>

                     <div class="flex justify-center items-center">
                        <p class="text-l">
                           {{ video.description }}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
   </div>

   <!-- Normal screen -->
   <div class="hidden lg:flex flex-col min-h-screen h-full w-full lg:visible">
      <div class="grid grid-cols-12 h-16 w-full bg-richblack text-platinum">
         <div class="col-span-2 flex justify-start items-center">
            <p class="text-5xl ml-6">FLL</p>
         </div>

         <span class="col-span-6"></span>

         <div class="col-span-4 flex justify-center items-center">
            <div class="basis-1/3 flex justify-center items-center">
               <a class="text-xl" href="#">Menüpont</a>
            </div>
            <div class="basis-1/3 flex justify-center items-center">
               <a class="text-xl" href="#">Menüpont</a>
            </div>
            <div class="basis-1/3 flex justify-center items-center">
               <a class="text-xl" href="#">Menüpont</a>
            </div>
         </div>
      </div>

      <div class="flex flex-wrap flex-grow overflow-y-auto w-full h-full bg-oxfordblue">
         <div v-for="video in videos" class="flex flex-col w-1/3 h-auto video-card items-center mt-5">
            <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
               <div class="flex justify-center items-center h-full w-full basis-3/4">
                  <iframe class="w-93p h-90p rounded-3xl" :src="video.videoUrl"></iframe>
               </div>

               <div class="flex justify-center items-center h-full w-full basis-1/4">
                  <div class="flex flex-col justify-center items-center rounded-3xl bg-silverlakeblue h-90p w-93p mb-5">
                     <div class="flex justify-center items-center">
                        <p class="text-3xl">
                           {{ video.title }}
                        </p>
                     </div>

                     <div class="flex justify-center items-center">
                        <p class="text-l">
                           {{ video.description }}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style></style>
