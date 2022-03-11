<template>
    <footer class="mt-5 border-top border-dotted">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-8 col-sm-12 mt-4 mx-auto">
                    <div class="d-flex justify-content-center">
                        <a v-for="(social,index) in socials" :key="index" :href="social.link" class="w-40px h-40px m-2 rounded-circle bg-dark text-light position-relative">
                            <span class="position-absolute top-50 start-50 translate-middle">
                                <i :class="social.icon"></i>
                            </span>
                        </a>                        
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <div class="d-flex justify-content-center">
                        <router-link tag="span" to="/about" class="nav-link pointer">
                            Haqqımızda
                        </router-link>
                         <router-link tag="span" to="/authors" class="nav-link pointer">
                            Yazarlar
                        </router-link>
                        <!-- <router-link tag="span" to="/contact" class="nav-link pointer">
                            Əlaqə
                        </router-link> -->
                    </div>
                </div>

                <div class="col-12 mt-4 mb-4">
                    <div class="d-flex justify-content-center">
                        <span class="text-muted">
                            © 2017-{{ currentYear }} elmtehsil.com
                        </span>                      
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data(){
        return{
        }
    },
    computed:{
        currentYear(){
            const date = new Date();
            const year = date.getFullYear();
            return year;
        },
        ...mapState({
            "socials":      state => state.Start.siteData.settings.social
        })
    }
}
</script>
