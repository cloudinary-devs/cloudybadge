<template>
    <div>
        <div class="flex flex-col">
        <h2 class="mx-auto my-3">And the winner is...</h2>
        <div class="flex items-center justify-center p-3 bg-grey-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" class="mr-5">
                <path d="M13.408 18c.498-3.947 5.592-7.197 5.592-17h-14c0 9.803 5.105 13.053 5.604 17h2.804zm-3.614-11.472l1.46-.202.643-1.326.643 1.326 1.46.202-1.063 1.021.26 1.451-1.3-.695-1.3.695.26-1.451-1.063-1.021zm-3.803 4.128c.286.638.585 1.231.882 1.783-4.065-1.348-6.501-5.334-6.873-9.439h4.077c.036.482.08.955.139 1.405h-2.689c.427 2.001 1.549 4.729 4.464 6.251zm10.009 10.963v1.381h-8v-1.381c1.941 0 2.369-1.433 2.571-2.619h2.866c.193 1.187.565 2.619 2.563 2.619zm8-18.619c-.372 4.105-2.808 8.091-6.873 9.438.297-.552.596-1.145.882-1.783 2.915-1.521 4.037-4.25 4.464-6.251h-2.688c.059-.45.103-.922.139-1.405h4.076z"/>
            </svg>
            <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg.png"
                :transformation="getTransformation(winner)"  width="150" crop="scale" class="ml-5 border-2"/>
        </div>
        </div>
        <div class="m-5">
            <h3 class="mb-5">Our top ❤️ badges: </h3>
            <div class="flex flex-wrap"> 
                <div v-for="(user, i) in list" :key="i" class="flex mx-3 flex-no-shrink">
                    <cld-image public-id="_cloudybadge/hackb4xmas/assets/badge-bg.png"
                    :transformation="getTransformation(user)"
                    width="100" crop="scale" 
                    class="border-2"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        getTransformation(user) {
            return [{
                overlay: user.avatar.public_id.replace(/\//gm, ':'),
                radius:"max",
                width:"800",
                height:"800",
                x:"6",
                y:"320",
                crop:"thumb",
                ...user.avatar.transformation,
            }, {
                overlay: `text:Roboto_80:${user.name}`,
                y: "-1000"
            }, {
                overlay: `text:Roboto_50:${user.company}`,
                y: "-900"
            }, {
                overlay: `text:Roboto_50:${user.title}`,
                y: "-800"
            }]
            },
    },
    data() {
        return {
            winner: {
                name: "Maya Shavin",
                company: 'Cloudinary',
                title: 'SRE',
                avatar: {
                public_id: "_cloudybadge/hackb4xmas/assets/blbhofoixmaaqju9hecw",
                transformation: {
                    name: 'Hokusai',
                    crop: 'fill',
                    dpr: 'auto',
                    effect: 'art:hokusai',
                }
                },
                id: 1,
            },
            list: [{
                name: "Maya Shavin",
                company: 'Cloudinary',
                title: 'SRE',
                avatar: {
                    public_id: "_cloudybadge/hackb4xmas/assets/blbhofoixmaaqju9hecw",
                    transformation: {
                        name: 'Hokusai',
                        crop: 'fill',
                        dpr: 'auto',
                        effect: 'art:hokusai',
                    }
                },
                id: 2,
            }, {
                name: "Maya Shavin",
                company: 'Cloudinary',
                title: 'SRE',
                avatar: {
                    public_id: "_cloudybadge/hackb4xmas/assets/blbhofoixmaaqju9hecw",
                    transformation: {
                        name: 'Hokusai',
                        crop: 'fill',
                        dpr: 'auto',
                        effect: 'art:hokusai',
                    }
                },
                id: 3
            }]
        }
    }
}
</script>