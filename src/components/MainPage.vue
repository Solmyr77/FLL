<script>
import axios from "axios";
import PocketBase from "pocketbase";

class Video {
   constructor(videoData) {
      this.url = videoData.url;
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

class Image {
   constructor(imageData) {
      this.id = this.extractId(imageData.url);
      this.videoUrl = `https://www.youtube.com/embed/${this.id}`;
      this.url = imageData.url;
      this.title = imageData.title;
      this.description = imageData.description;
      this.type = imageData.type;
      this.category = imageData.category;
   }

   extractId(url) {
      const urlParts = url.split("v=");
      const idPart = urlParts[1];
      return idPart ? idPart.split("&")[0] : "";
   }
}

class Comment {
   constructor(userName, text) {
      this.userName = userName;
      this.text = text;
   }
}

export default {
   data() {
      return {
         pb: undefined,
         comments: [],
         videoData: [
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/videos/karbiszet1.mp4?raw=true",
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
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/videos/karbiossze1.mp4?raw=true",
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
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/videos/karbiossze3.mp4?raw=true",
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
         imageData: [
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/videos/rebukerbe.mp4?raw=true",
               title: "Rebuker Kft",
               description: "",
               category: "visit",
               type: "video",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_090729.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_090802.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_091711.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_094447.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_095000.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_095942.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_100618.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/20240202_104421.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_094957.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_095426.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_100313.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_100330.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_100548.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_100643.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_100700.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_20240202_100744.jpg?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_9071.JPG?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_9072.JPG?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_9074.JPG?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_9076.JPG?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_9077.JPG?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_9080.JPG?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://github.com/Solmyr77/FLL/blob/main/src/assets/images/IMG_9081.JPG?raw=true",
               title: "",
               description: "",
               category: "visit",
               type: "image",
            },
            {
               url: "https://www.youtube.com/watch?v=9-EnALiMLog",
               title: "Látogatás",
               description: "1. rész",
               category: "visit",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=6grajJ9a6Wc",
               title: "Látogatás",
               description: "2. rész",
               category: "visit",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=YuBBH-D0cF4",
               title: "Látogatás",
               description: "3. rész",
               category: "visit",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=wL9J28pMJZ0",
               title: "Látogatás",
               description: "4. rész",
               category: "visit",
               type: "youtube",
            },
            {
               url: "https://www.youtube.com/watch?v=0rptrY7xHLY",
               title: "Látogatás",
               description: "5. rész",
               category: "visit",
               type: "youtube",
            },
         ],
         videos: [],
         images: [],
         userVisits: "2380",
         clientId: "",
         selectedCategory: "all",
         commentText: "",
         nameInput: "",
         tempComments: [],
         outComments: [],
      };
   },
   mounted() {
      if (!localStorage.getItem("guid")) {
         localStorage.setItem("guid", this.uuidv4());
      }

      this.pb = new PocketBase("http://sp.myddns.me:1235");
      this.pb.autoCancellation(false);

      this.collection = this.pb.collection("comments");
      this.collection.subscribe("*", () => this.getComments());

      this.generateObjectsVideo();
      this.generateObjectsImage();
      this.trackUserVisit();

      this.getComments();
   },
   computed: {
      filteredVideos() {
         if (this.selectedCategory === "all") {
            return this.videos;
         }
         return this.videos.filter((video) => video.category === this.selectedCategory);
      },
      filteredImages() {
         if (this.selectedCategory === "rebuker") {
            return this.images.filter((video) => video.type === "youtube" || video.type === "video");
         } else if (this.selectedCategory === "images") {
            return this.images.filter((video) => video.type === "image");
         }
      },
   },
   methods: {
      async getComments() {
         this.comments = [];
         this.tempComments = [];
         this.outComments = [];

         const { items } = await this.collection.getList(1, 10000);

         items.forEach((item) => {
            this.comments.push(new Comment(item.username, item.text));
         });

         this.tempComments = this.comments.sort(() => 0.5 - Math.random())
         this.outComments = this.tempComments.slice(0, 3);

         setInterval(() => {
            this.outComments = [];
            this.tempComments = this.comments.sort(() => 0.5 - Math.random())
            this.outComments = this.tempComments.slice(0, 3);
         }, 6000)
      },
      async sendComment() {
         let text = this.commentText;
         let username = this.nameInput;

         if (this.nameInput == "") {
            username = "Névtelen";
         }

         this.commentText = "";
         this.nameInput = "";

         await this.collection.create({ username, text });
      },
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
      generateObjectsVideo() {
         this.videos = this.videoData.map((data) => new Video(data));
      },
      generateObjectsImage() {
         this.images = this.imageData.map((data) => new Image(data));
         console.log(this.images);
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
      <div class="grid grid-rows-6 h-80 w-full bg-richblack text-platinum">
         <div class="flex justify-center items-center h-full w-full">
            <!--<p class="text-6xl">First Lego League - Innovációs projekt</p>-->
            <img src="https://coderina.org/wp-content/uploads/2023/08/FIRST-Lego-League-MASTERPIECE.png" class="w-60 h-12"
               @click="selectedCategory = 'all'" />
         </div>

         <div class="flex justify-center items-center h-full w-full">
            <p class="text-2xl">Látogatások: {{ userVisits }}</p>
         </div>

         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue"
            @click="selectedCategory = 'service'">
            <a class="text-2xl cursor-pointer pointer-events-none">Szerelés</a>
         </div>
         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue" @click="selectedCategory = 'test'">
            <a class="text-2xl cursor-pointer pointer-events-none">Teszt</a>
         </div>
         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue"
            @click="selectedCategory = 'rebuker'">
            <a class="text-2xl cursor-pointer pointer-events-none">Rebuker Kft</a>
         </div>
         <div class="flex justify-center items-center h-full w-full hover:bg-yinblue" @click="selectedCategory = 'images'">
            <a class="text-2xl cursor-pointer pointer-events-none">Képek</a>
         </div>
      </div>

      <div class="flex flex-wrap flex-grow overflow-y-auto w-full h-full bg-oxfordblue">
         <template v-if="selectedCategory == 'service' || selectedCategory == 'test' || selectedCategory == 'all'">
            <div v-for="video in filteredVideos" class="flex flex-col w-full h-auto video-card items-center mt-5">
               <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
                  <div v-if="video.type == 'youtube'" class="flex justify-center items-center h-full w-full basis-3/4">
                     <iframe class="w-93p h-90p rounded-3xl" :src="video.videoUrl"></iframe>
                  </div>

                  <div v-else class="flex justify-center items-center h-full w-full basis-3/4">
                     <video class="w-93p h-90p rounded-3xl" :src="video.url" controls></video>
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
         </template>

         <template v-else-if="selectedCategory == 'rebuker'">
            <div v-for="image in filteredImages" class="flex flex-col w-full h-auto video-card items-center mt-5">
               <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
                  <div v-if="image.type == 'youtube'" class="flex justify-center items-center h-full w-full basis-3/4">
                     <iframe class="w-93p h-90p rounded-3xl" :src="image.videoUrl"></iframe>
                  </div>

                  <div v-else-if="image.type == 'video'" class="flex justify-center items-center h-full w-full basis-3/4">
                     <video class="w-93p h-90p rounded-3xl" :src="image.url" controls></video>
                  </div>

                  <div class="flex justify-center items-center h-full w-full basis-1/4">
                     <div class="flex flex-col justify-center items-center rounded-3xl bg-silverlakeblue h-90p w-93p mb-5">
                        <div class="flex justify-center items-center mb-1">
                           <p class="text-2xl text-center">
                              {{ image.title }}
                           </p>
                        </div>

                        <div class="flex justify-center items-center">
                           <p class="text-xl text-center">
                              {{ image.description }}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </template>

         <template v-else-if="selectedCategory == 'images'">
            <div v-for="image in filteredImages" class="flex flex-col w-full h-auto video-card items-center mt-5">
               <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
                  <div class="flex justify-center items-center h-full w-full basis-3/4">
                     <img class="w-93p h-90p rounded-3xl" :src="image.url" />
                  </div>
               </div>
            </div>
         </template>
      </div>

      <!--Comments area-->
      <div class="flex justify-center items-center w-full bg-richblack">
         <div class="flex justify-center items-center w-full h-90p flex-col">

            <div class="flex justify-center items-center flex-col basis-1/3 w-full h-full mt-8">

               <div class="flex justify-center items-center w-full h-full basis-1/4">
                  <input placeholder="Név"
                     class="w-95p rounded-tl-2xl rounded-tr-2xl h-full text-2xl px-2 bg-indigodye text-platinum"
                     v-model="nameInput" type="text">
               </div>

               <div class="flex justify-center items-center w-full h-full basis-2/4">
                  <textarea placeholder="Ide írd az üzenetet" v-model="commentText"
                     class="w-95p resize-none bg-yinblue outline-none p-2 h-full text-platinum" name="commentTextBoxN"
                     id="commentTextBox"></textarea>
               </div>

               <div class="flex justify-center items-center w-full h-full basis-1/4">
                  <button @click="sendComment"
                     class="w-95p h-full bg-indigodye hover:bg-slate-700 rounded-bl-2xl rounded-br-2xl text-2xl text-platinum flex items-center justify-center">Küldés</button>
               </div>
            </div>

            <div
               class="flex flex-col justify-center items-center bg-silverlakeblue rounded-2xl h-full w-95p mt-8 mb-4">

               <div
                  class="w-full h-full flex justify-center items-center basis-1/4 bg-indigodye text-platinum rounded-tl-2xl rounded-tr-2xl">
                  <h1 class="text-2xl">Amiket rólunk írtak</h1>
               </div>

               <div
                  class="flex w-full flex-col flex-grow-0 h-full items-center justify-center basis-3/4 text-platinum overflow-x-auto">

                  <div v-for="comment in outComments"
                     class="flex flex-col justify-center items-center h-90p w-95p text-wrap p-2 flex-shrink-0 animate-fade">
                     <div class="flex justify-between h-full items-center w-95p flex-col bg-oxfordblue rounded-2xl p-2">
                        <div class="basis-5/6 flex justify-center w-full items-center text-center">
                           <h1>{{ comment.text }}</h1>
                        </div>
                        <div class="basis-1/6 flex items-center justify-end w-full h-full mr-6">
                           <h1 class="italic">-{{ comment.userName }}</h1>
                        </div>
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
         <div class="col-span-5 flex justify-start items-center">
            <!--<p class="text-2xl ml-6">First Lego League - Innovációs projekt</p>-->
            <img src="https://coderina.org/wp-content/uploads/2023/08/FIRST-Lego-League-MASTERPIECE.png"
               class="w-60 h-12 ml-4 cursor-pointer" @click="selectedCategory = 'all'" />
         </div>

         <div class="col-span-5 flex justify-end items-center">
            <div class="basis-1/4 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400 cursor-pointer" @click="selectedCategory = 'service'">Szerelés</a>
            </div>
            <div class="basis-1/4 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400 cursor-pointer" @click="selectedCategory = 'test'">Teszt</a>
            </div>
            <div class="basis-1/4 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400 cursor-pointer" @click="selectedCategory = 'rebuker'">Rebuker Kft</a>
            </div>
            <div class="basis-1/4 flex justify-center items-center">
               <a class="text-xl hover:text-stone-400 cursor-pointer" @click="selectedCategory = 'images'">Képek</a>
            </div>
         </div>

         <div class="col-span-2 flex justify-center items-center">
            <p class="text-2xl">Látogatások: {{ userVisits }}</p>
         </div>
      </div>

      <div class="flex flex-wrap flex-grow overflow-y-auto w-full h-full bg-oxfordblue">
         <template v-if="selectedCategory == 'service' || selectedCategory == 'test' || selectedCategory == 'all'">
            <div v-for="video in filteredVideos" class="flex flex-col w-1/3 h-auto video-card items-center mt-5">
               <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
                  <div v-if="video.type == 'youtube'" class="flex justify-center items-center h-full w-full basis-3/4">
                     <iframe class="w-93p h-90p rounded-3xl" :src="video.videoUrl"></iframe>
                  </div>

                  <div v-else-if="video.type == 'video'" class="flex justify-center items-center h-full w-full basis-3/4">
                     <video class="w-93p h-90p rounded-3xl object-fill" :src="video.url" controls></video>
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
         </template>

         <template v-else-if="selectedCategory == 'rebuker'">
            <div v-for="image in filteredImages" class="flex flex-col w-1/3 h-auto video-card items-center mt-5">
               <div class="flex flex-col justify-center items-center w-95p h-95p bg-yinblue rounded-3xl">
                  <div v-if="image.type == 'youtube'" class="flex justify-center items-center h-full w-full basis-3/4">
                     <iframe class="w-93p h-90p rounded-3xl" :src="image.videoUrl"></iframe>
                  </div>

                  <div v-else-if="image.type == 'video'" class="flex justify-center items-center h-full w-full basis-3/4">
                     <video class="w-93p h-90p rounded-3xl object-fill" :src="image.url" controls></video>
                  </div>

                  <div class="flex justify-center items-center h-full w-full basis-1/4">
                     <div class="flex flex-col justify-center items-center rounded-3xl bg-silverlakeblue h-90p w-93p mb-5">
                        <div class="flex justify-center items-center mb-1">
                           <p class="text-3xl text-center">
                              {{ image.title }}
                           </p>
                        </div>

                        <div class="flex justify-center items-center">
                           <p class="text-xl text-center">
                              {{ image.description }}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </template>

         <template v-else-if="selectedCategory == 'images'">
            <div v-for="image in filteredImages" class="flex flex-col w-1/3 h-auto video-card items-center mt-5">
               <div class="flex flex-col justify-center items-center w-95p h-90p bg-yinblue rounded-3xl">
                  <div class="flex justify-center items-center h-full w-full basis-3/4">
                     <img class="w-93p rounded-3xl max-h-90p" :src="image.url" />
                  </div>
               </div>
            </div>
         </template>
      </div>

      <!--Comments area-->
      <div class="flex justify-center items-center h-60 w-full bg-richblack">
         <div class="flex justify-center items-center w-full h-90p">
            <div class="flex justify-center items-center flex-col basis-1/3 w-full h-full">

               <div class="flex justify-center items-center w-full h-full basis-1/4">
                  <input placeholder="Név"
                     class="w-95p rounded-tl-2xl rounded-tr-2xl h-full text-2xl px-2 bg-indigodye text-platinum"
                     v-model="nameInput" type="text">
               </div>

               <div class="flex justify-center items-center w-full h-full basis-2/4">
                  <textarea placeholder="Ide írd az üzenetet" v-model="commentText"
                     class="w-95p resize-none bg-yinblue outline-none p-2 h-full text-platinum" name="commentTextBoxN"
                     id="commentTextBox"></textarea>
               </div>

               <div class="flex justify-center items-center w-full h-full basis-1/4">
                  <button @click="sendComment"
                     class="w-95p h-full bg-indigodye hover:bg-slate-700 rounded-bl-2xl rounded-br-2xl text-2xl text-platinum flex items-center justify-center">Küldés</button>
               </div>


            </div>

            <div
               class="flex flex-col justify-center items-center basis-2/3 bg-silverlakeblue rounded-2xl h-full w-full mr-4">

               <div
                  class="w-full h-full flex justify-center items-center basis-1/4 bg-indigodye text-platinum rounded-tl-2xl rounded-tr-2xl">
                  <h1 class="text-2xl">Amiket rólunk írtak</h1>
               </div>

               <div
                  class="flex w-full flex-grow-0 h-full items-center justify-center basis-3/4 text-platinum overflow-x-auto">

                  <div v-for="comment in outComments"
                     class="flex flex-col justify-center items-center h-90p w-1/3 text-wrap p-2 flex-shrink-0 animate-fade">
                     <div class="flex justify-between h-full items-center w-95p flex-col bg-oxfordblue rounded-2xl p-2">
                        <div class="basis-5/6 flex justify-center w-full items-center text-center">
                           <h1>{{ comment.text }}</h1>
                        </div>
                        <div class="basis-1/6 flex items-center justify-end w-full h-full mr-6">
                           <h1 class="italic">-{{ comment.userName }}</h1>
                        </div>
                     </div>
                  </div>

               </div>

            </div>

         </div>
      </div>
   </div>
</template>

<style></style>
