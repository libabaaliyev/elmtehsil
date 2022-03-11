<template>
    <div class="row">
        <div v-for="(author,i) in team" :key="i" class="col-12">
            <router-link tag="div" :to="'authors/' + author.username" class="section-title pointer">
                <h3 class="title">{{ author.name }}</h3>
            </router-link>
            <div class="author media">
                <div class="float-start me-3">
                    <router-link tag="a" :to="'authors/' + author.username" href="#" class="pointer">
                        <div v-if="online">
                            <img class="author-img media-object" :src="imageRoot+author.image" :alt="author.name">
                        </div>
                        <div v-else>
                            <i class="fal fa-user"></i>
                        </div>
                    </router-link>
                </div>
                <div class="float-start">
                    <router-link tag="p" :to="'authors/' + author.username" class="pointer">{{ author.about }}</router-link>
                    <div class="d-flex justify-content-start">                        
                        <a v-for="(social,i) in socials" :key="i" :href="social.link+author[social.name]" :class="{'w-40px h-40px m-2 rounded-circle bg-dark text-light position-relative': author[social.name]}">
                            <span v-if="author[social.name]" class="position-absolute top-50 start-50 translate-middle">
                                <i :class="social.icon"></i>
                            </span>
                        </a>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data(){
        return{
             socials : [
                
                {
                    "name": "facebook",
                    "icon": "fab fa-facebook-f",
                    "link": ""
                },                
                {
                    "name": "twitter",
                    "icon": "fab fa-twitter",
                    "link": ""
                },                
                {
                    "name": "linkedin",
                    "icon": "fab fa-linkedin-in",
                    "link": ""
                },                
                {
                    "name": "mail",
                    "icon": "fal fa-envelope",
                    "link": "mailto:"
                },                
                {
                    "name": "instagram",
                    "icon": "fab fa-instagram",
                    "link": ""
                }
             ]
        }
    },
    computed:{
        ...mapState({
            team:       state => state.News.team,
            imageRoot:  state => state.Start.imageRoot
        }),
        online(){
            if(navigator.onLine){
                return true;
            }
            else{
                return false;
            }
        }

    }
}
</script>