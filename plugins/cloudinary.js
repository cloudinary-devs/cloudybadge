import Cloudinary, { CldImage, CldTransformation } from 'cloudinary-vue';
import Vue from 'vue';

Vue.use(Cloudinary, {
    configuration: {
        cloudName: 'cdemo',
    },
    components: [ CldImage, CldTransformation ]
})