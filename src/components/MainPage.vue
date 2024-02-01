<script>
import axios from 'axios';

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
         userVisits: "0",
         clientId: ""
      };
   },
   mounted() {
      if (!localStorage.getItem("guid")) {
         localStorage.setItem("guid", this.uuidv4())
      }

      this.generateObjects();
      this.trackUserVisit();
   },
   methods: {
      async trackUserVisit() {
         await axios.post("http://localhost:1234/track-visit", {
            timestamp: new Date().toISOString(),
            client: localStorage.getItem("guid"),
         })
            .then(response => {
               this.userVisits = response.data.message;
               console.log("Visit tracked");
            })
            .catch(error => {
               console.log(`Error tracking: ${error}`);
            })
      },
      generateObjects() {
         this.videos = this.videoData.map((data) => new Video(data));
      },
      uuidv4() {
         return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
         );
      }
   },
};
</script>

<template>
   <!--Phone screen-->
   <div class="flex flex-col min-h-screen h-full w-full lg:hidden">
      <div class="grid grid-rows-5 h-80 w-full bg-richblack text-platinum">

         <div class="flex justify-center items-center h-full w-full">
            <p class="text-6xl">FLL</p>
         </div>

         <div class="flex justify-center items-center h-full w-full">
            <p class="text-2xl">Felhasználók: {{ this.userVisits }}</p>
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

         <span class="col-span-4"></span>

         <div class="col-span-4 flex justify-center items-center">
            <div class="basis-1/3 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400" href="#">Menüpont</a>
            </div>
            <div class="basis-1/3 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400" href="#">Menüpont</a>
            </div>
            <div class="basis-1/3 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400" href="#">Menüpont</a>
            </div>
         </div>

         <div class="col-span-2 flex justify-center items-center">
            <p class="text-2xl">Felhasználók: {{ this.userVisits }}</p>
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
