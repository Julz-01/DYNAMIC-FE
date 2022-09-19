<script>
import { mapState } from 'vuex';
export default {
  name: 'IndexPage',
  data() {
    return {
      userInfo: []
    }
  },
  mounted() {
    this.findFields();
    this.findMany();
  },
  computed: {
    ...mapState("user-info", ["info"]),
    ...mapState("user-field", ["fields"]),

  },
  methods: {
    async findMany() {
      try {
        const res = await this.$store.dispatch("user-info/getInfo")
      } catch (err) {
        console.log(err.response)
      }
    },
    async findFields() {
      try {
        const res = await this.$store.dispatch("user-field/getFields")
        console.log(res)
      } catch (err) {
        console.log(err.response)
      }
    },
    fieldInfo(fieldID) {
      return this.info.filter(
        (val) =>
          val.userFieldId === fieldID
      )
    }
  }
}
</script>
    
  
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4" v-for="field in fields" :key="field.id">
                <v-text-field :label="field.fldname" outlined v-model="userInfo[field.id]"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>