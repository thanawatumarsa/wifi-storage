<template lang="html">
    <tbody>
        <tr v-for="(wifi, index) in wifiInfo[tempIndex].accesspoint">
          <td>
            {{wifi.apName}}
          </td>
          <td>
            {{wifi.serial}}
          </td>
          <td>
            {{wifi.mac}}
          </td>
          <td>
            {{wifi.location}}
          </td>
          <td>
            <h3 @click="removeAp(index)">
              ลบ
            </h3>
            <h3 @click="editAp(wifi, index)" data-toggle="modal" data-target="#basicModal2">
              แก้ไข
            </h3>
          </td>
        </tr>
        <div class="modal fade" id="basicModal2" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Edit Access Point</h4>
              </div>
              <div class="modal-body">
                <form>
                    <div class="form-group">
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Name" v-model="editaccesspoint.apName">
                    </div>
                    <div class="form-group">
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Serial Number" v-model="editaccesspoint.serial">
                    </div>
                    <div class="form-group">
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="MAC Address" v-model="editaccesspoint.mac">
                    </div>
                    <div class="form-group">
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Location" v-model="editaccesspoint.location">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button @click="addAccessPoint(wifiInfo, tempIndex)" type="button" class="btn btn-primary" data-dismiss="modal">+ Add</button>
                </div>
              </div>
            </div>
          </div>
    </tbody>
</template>

<script>
export default {
  props: ['wifiInfo', 'tempIndex', 'removeAp', 'editAp', 'editaccesspoint'],
  data () {
    return {
      counts: 1
    }
  },
  methods: {
    count: function () {
      this.count = this.count + 1
    }
  }
}
</script>

<style lang="css">
</style>
