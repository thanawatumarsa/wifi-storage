<template lang="html">
  <tbody>
      <tr v-for="(wifi, index) in wifidetail.testLocation">
        <td>
          {{wifi.location}}
        </td>
        <td>
          {{wifi.dbm}}
        </td>
        <td>
          <span class="glyphicon glyphicon-edit" aria-hidden="true" data-toggle="modal" data-target="#basicModal2" style="cursor:pointer"></span>
          <span @click="remove(wifi, index)" class="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="modal" data-target="#remove" style="cursor:pointer"></span>
        </td>
        <div class="modal fade" id="remove" tabindex="-1" role="dialog" aria-labelledby="basicModal3" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Remove Location</h4>
              </div>
              <div class="modal-header">
                <h3>Are you sure to remove this Location?</h3>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
                <button  @click="removeTestLocation(removeindex)" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </tr>
  </tbody>
</template>

<script>
export default {
  props: ['wifidetail', 'locationindex', 'removeTestLocation'],
  data () {
    return {
      removeindex: ''
    }
  },
  methods: {
    remove: function (wifi, index) {
      this.removeindex = index
    }
  }
}
</script>

<style lang="css">
</style>
