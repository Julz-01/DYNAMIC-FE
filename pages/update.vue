<script>
    import { mapState } from 'vuex';
    export default {
      name: 'IndexPage',
      data() {
        return {
          userData: [],
          datePicker: []
        }
      },
      async fetch() {
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
            // console.log(res)
            // res.data.forEach(r => this.userData[r.userFieldId] = r.value)   
            if (res.status == 200) {
              const mapped = res.data.map((r) => this.userData[r.userFieldId] = r.value);
              console.log(mapped)
              this.findFields();
            }
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
        async updateInfo() {
          try {
            await this.$store.dispatch("user-info/updateInfo", { userInfo: this.userData, userId: 1 })
            // console.log(res)
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
                  <v-col cols="12" sm="6" md="12" v-for="field in fields" :key="field.id">
    
                    <!-- text field -->
                    <v-text-field v-if="field.type == 'text'" :label="field.fldname" outlined v-model="userData[field.id]">
                    </v-text-field>
                    <!-- /text field -->
    
                    <!-- select field -->
                    <v-select v-if="field.type == 'option'" :items="field.data" :label="field.fldname"
                      v-model="userData[field.id]" outlined>
                    </v-select>
                    <!-- /select field -->
    
                    <!-- date field -->
                    <v-menu v-if="field.type == 'date'" v-model="datePicker[field.id]" :close-on-content-click="false"
                      :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="userData[field.id]" outlined readonly :label="field.fldname" v-bind="attrs"
                          v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="userData[field.id]" @input="datePicker[field.id] = false"></v-date-picker>
                    </v-menu>
                    <!-- /date field -->
    
                  </v-col>
                </v-row>
                <v-btn color="success" @click="updateInfo()">
                  UPDATE
                </v-btn>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </template>