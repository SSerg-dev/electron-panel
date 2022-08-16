<template>

  <div>
    <section>
      <div>
        <ReceiptForm />
      </div>

    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import ReceiptForm  from '@/components/ReceiptForm'

export default Vue.extend({
  data: () => ({
    name: 'receipt'
  }),
  components: {
    ReceiptForm
  }
})

</script>

