<template>
    <div class="product-page" v-if="product">
      <ModelViewer :modelPath="product.modelPath" />
      <ProductDescription
        :title="product.title"
        :description="product.description"
        :size="product.size"
        :material="product.material"
        :color="product.color"
        :onOrderClick="handleOrder"
      />
    </div>
    <div v-else class="product-not-found">
      <h2>Produto não encontrado</h2>
    </div>
  </template>
  
  <script>
  import { PRODUCT_MAP } from '../data/products';
  import ModelViewer from '../components/ModelViewer.vue';
  import ProductDescription from '../components/ProductDescription.vue';
  
  export default {
    name: 'MainModelView',
    props: {
      id: { type: String, required: true }
    },
    components: {
      ModelViewer,
      ProductDescription
    },
    computed: {
      product() {
        return PRODUCT_MAP[this.id] || null;
      }
    },
    methods: {
      handleOrder() {
        alert(`Pedido realizado para: ${this.product.title}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-page {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .product-not-found {
    padding: 2rem;
    text-align: center;
  }
  </style>
  