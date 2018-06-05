<template>
<div>
    <hr>
   <p @click="">Axis {{dataValues}}</p>
   <hr>
   <p @click="">Axis {{fieldNames}}</p>
</div>
</template>

<script>
/* eslint-disable */
import { DataBus } from '@/main';

export default {
    data() {
        return {
         dataValues: 0,
         fieldNames: ''
        }
    },
    created() {
        DataBus.$on('dataJson', (dataJson) => {
            this.dataValues = dataJson;
            console.log(this.dataValues);
        });
        DataBus.$on('fieldArray', (fieldArray) => {
            this.fieldNames = fieldArray;
            console.log(this.fieldNames);
        });
    }

}

</script>

<style scoped>


</style>


