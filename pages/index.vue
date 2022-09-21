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
    this.findMany();
    this.findFields();
  },
  computed: {
    ...mapState("user-info", ["info"]),
    ...mapState("user-field", ["fields"]),

  },
  methods: {
    async findMany() {
      try {
        const res = await this.$store.dispatch("user-info/getInfo")
        // console.log(res)
        // res.data.forEach(r => this.userInfo[r.userFieldId] = r.value)   
        const mapped = res.data.map((r) => this.userInfo[r.userFieldId] = r.value);
        console.log(mapped)
      } catch (err) {
        console.log(err.response)
      }
    },
    async findFields() {
      try {
        const res = await this.$store.dispatch("user-field/getFields")
      } catch (err) {
        console.log(err.response)
      }
    },
    async createInfo() {
      try {
        const res = await this.$store.dispatch("user-info/createInfo", this.userInfo)
      } catch (err) {
        console.log(err.response)
      }
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
                <!-- {{ userInfo[field.id] }} -->
              </v-col>
            </v-row>
            <v-btn color="primary" @click="createInfo()">
              Primary
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>