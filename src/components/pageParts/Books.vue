<template>
    <div id="books">
        <div v-if="books.length > 0">
            <div class="col-12 card border-none mb-3" v-for="(book,i) in books" :key="i">
                <div class="row g-0">
                    <div class="col-md-4 h-180px">
                        <img :src="imageRoot + book.image" class="img-fluid img-height rounded-start pointer" :alt="book.name">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <router-link :to="'/read/' + book.book_seo" tag="h5" class="card-title pointer">{{ book.name }}</router-link>
                            <router-link :to="'/read/' + book.book_seo" tag="p" class="card-text pointer">
                                <small class="text-14px" v-text="((book.description).replace(/<[^>]*>?/gm, '')).substr(0,120)">
                                ...
                                </small>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="w-100 h-300px position-relative">
                <span class="position-absolute top-50 start-50 translate-middle" v-if="activeTab == 'likes'">
                    <i class="fal fa-search p-3"></i>
                    Bəyəndiyiniz kitab yoxdur.</span>
                <span class="position-absolute top-50 start-50 translate-middle" v-else>
                    <i class="fal fa-search p-3"></i>
                    Heç bir kitab tapılmadı.
                </span>
            </div>
        </div>
    </div>
    
</template>
<script>
import { mapState } from 'vuex';
export default {
    props: ['books'],
    computed:{
        ...mapState({
            "imageRoot":    state => state.Start.imageRoot,
            "activeTab":    state => state.Start.activeTab
        })
    },
}
</script>