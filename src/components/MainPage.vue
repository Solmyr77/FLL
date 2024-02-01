<script>
import axios from "axios";

class Video {
   constructor(videoData) {
      this.id = this.extractId(videoData.url);
      this.videoUrl = `https://www.youtube.com/embed/${this.id}`;
      this.title = videoData.title;
      this.description = videoData.description;
      this.type = videoData.type;
      this.category = videoData.category;
      this.localVideoUrl = videoData.localVideoUrl;
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
               url: "karbiszet1.mp4",
               title: "Karburátor szétszerelés",
               description: "1. rész",
               category: "service",
               type: "video",
               localVideoUrl: "karbiszet1.mp4",
            },
            {
               url: "https://www.youtube.com/watch?v=brtx3Cppbhg",
               title: "Karburátor szétszerelés",
               description: "2. rész",
               category: "service",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=iMe8kjffh0U",
               title: "Karburátor szétszerelés",
               description: "3. rész",
               category: "service",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=hiyHMR3PV2Y",
               title: "Karburátor szétszerelés",
               description: "4. rész",
               category: "service",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=t461mv8x5u8",
               title: "Karburátor tisztítás",
               description: "",
               category: "service",
               type: "youtube",
            },
            {
               url: "karbiossze1.mp4",
               title: "Karburátor összeszerelés",
               description: "1. rész",
               category: "service",
               type: "video",
               localVideoUrl: "karbiossze1.mp4",
            },
            {
               url: "https://www.youtube.com/watch?v=5nR6cDxGL-4",
               title: "Karburátor összeszerelés",
               description: "2. rész",
               category: "service",
               type: "youtube",
            },
            {
               url: "karbiszet1.mp4",
               title: "Karburátor összeszerelés",
               description: "3. rész",
               category: "service",
               type: "video",
               localVideoUrl: "karbiszet1.mp4",
            },
            {
               url: "https://www.youtube.com/watch?v=DcoRRlJNScs",
               title: "Karburátor összeszerelés",
               description: "4. rész",
               category: "service",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=JYr6OprXUv0",
               title: "Karburátor összeszerelés",
               description: "5. rész",
               category: "service",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=tY1iIMTnoxM",
               title: "Teszt",
               description: "1. rész",
               category: "test",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=Zpc02Z7uqvk",
               title: "Teszt",
               description: "2. rész",
               category: "test",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=s1uUqeaiabQ",
               title: "Teszt",
               description: "3. rész",
               category: "test",
               type: "youtube",
            },
         ],
         videos: [],
         userVisits: "0",
         clientId: "",
         selectedCategory: "all",
      };
   },
   mounted() {
      /*if (!localStorage.getItem("guid")) {
         localStorage.setItem("guid", this.uuidv4());
      }*/

      localStorage.setItem("guid", this.uuidv4());

      this.generateObjects();
      this.trackUserVisit();
   },
   computed: {
      filteredVideos() {
         if (this.selectedCategory === "all") {
            return this.videos;
         }
         return this.videos.filter((video) => video.category === this.selectedCategory);
      },
   },
   methods: {
      async trackUserVisit() {
         await axios
            .post("http://sp.myddns.me:1234/track-visit", {
               timestamp: new Date().toISOString(),
               client: localStorage.getItem("guid"),
            })
            .then((response) => {
               this.userVisits = response.data.message;
               console.log("Visit tracked");
            })
            .catch((error) => {
               console.log(`Error tracking: ${error}`);
            });
      },
      generateObjects() {
         this.videos = this.videoData.map((data) => new Video(data));
      },
      uuidv4() {
         return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
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

         <div class="flex justify-center items-center h-full w-full">
            <p class="text-2xl">Látogatások: {{ this.userVisits }}</p>
         </div>

         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue">
            <a class="text-2xl cursor-pointer" @click='selectedCategory = "service"; console.log(selectedCategory)'>Szerelés</a>
         </div>
         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue">
            <a class="text-2xl cursor-pointer" @click='selectedCategory = "test"; console.log(selectedCategory)'>Teszt</a>
         </div>
      </div>

      <div class="flex flex-wrap flex-grow overflow-y-auto w-full h-full bg-oxfordblue">
         <div v-for="video in filteredVideos" class="flex flex-col w-full h-auto video-card items-center mt-5">
            <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
               <div v-if="video.type == 'youtube'" class="flex justify-center items-center h-full w-full basis-3/4">
                  <iframe class="w-93p h-90p rounded-3xl" :src="video.videoUrl"></iframe>
               </div>

               <div v-else class="flex justify-center items-center h-full w-full basis-3/4">
                  <video class="w-93p h-90p rounded-3xl" :src="`src/assets/videos/${video.localVideoUrl}`" controls></video>
               </div>

               <div class="flex justify-center items-center h-full w-full basis-1/4">
                  <div class="flex flex-col justify-center items-center rounded-3xl bg-silverlakeblue h-90p w-93p mb-5">
                     <div class="flex justify-center items-center mb-1">
                        <p class="text-2xl text-center">
                           {{ video.title }}
                        </p>
                     </div>

                     <div class="flex justify-center items-center">
                        <p class="text-xl text-center">
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

         <div class="col-span-4 flex justify-end items-center">
            <div class="basis-1/3 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400 cursor-pointer" @click='selectedCategory = "service"; console.log(selectedCategory)'>Szerelés</a>
            </div>
            <div class="basis-1/3 flex justify-center items-center">
               <a
                  class="text-xl hover:text-stone-400 cursor-pointer"
                  @click='selectedCategory = "test"; console.log(selectedCategory)'
                  >Teszt</a
               >
            </div>
         </div>

         <div class="col-span-2 flex justify-center items-center">
            <p class="text-2xl">Látogatások: {{ this.userVisits }}</p>
         </div>
      </div>

      <div class="flex flex-wrap flex-grow overflow-y-auto w-full h-full bg-oxfordblue">
         <div v-for="video in filteredVideos" class="flex flex-col w-1/3 h-auto video-card items-center mt-5">
            <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
               <div v-if="video.type == 'youtube'" class="flex justify-center items-center h-full w-full basis-3/4">
                  <iframe class="w-93p h-90p rounded-3xl" :src="video.videoUrl"></iframe>
               </div>

               <div v-else-if="video.type == 'video'" class="flex justify-center items-center h-full w-full basis-3/4">
                  <video class="w-93p h-90p rounded-3xl object-fill" :src="`src/assets/videos/${video.localVideoUrl}`" controls></video>
               </div>

               <div class="flex justify-center items-center h-full w-full basis-1/4">
                  <div class="flex flex-col justify-center items-center rounded-3xl bg-silverlakeblue h-90p w-93p mb-5">
                     <div class="flex justify-center items-center mb-1">
                        <p class="text-3xl text-center">
                           {{ video.title }}
                        </p>
                     </div>

                     <div class="flex justify-center items-center">
                        <p class="text-xl text-center">
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
