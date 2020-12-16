<script>
  import {onMount, createEventDispatcher } from 'svelte';
  import UISinkOptions from './options.sink.svelte';
  import CommonLocal from './index.js';
	let dispatch = createEventDispatcher();

  export let options = {};

  export let title = '';
  export let subtitle = '';

  export let readonly = false;
  export let disabled = false;

  let sinks = [];

  onMount(()=>{
    sinks = [];
    if (options.sinks){
      sinks = [...Object.values(options.sinks)];
    }
  });

  function refreshOptions(){
    options.sinks = {};
    sinks.forEach((sink) => {
      options.sinks[sink.id] = sink;
    });
  }

  function saveToServer(){
    refreshOptions();
    dispatch('save', options);
  }

  function addSink(){
    sinks.unshift(CommonLocal.getDefaultSink());
    sinks = sinks;
    refreshOptions();
  }

  function removeSink(e){
    if (e.detail.index > -1){
      sinks.splice(e.detail.index, 1);
      sinks = sinks;
      refreshOptions();
    }
  }

</script>

<h2 class="title is-2">{title}</h2>
<h3 class="subtitle is-3">{subtitle}</h3>
<div class="field is-horizontal">
  <div class="field-label">
    <!-- Left empty for spacing -->
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-primary" on:click={addSink}>Добавить назначение</button>
      </div>
    </div>
  </div>
</div>
{#if sinks && sinks.length }
  {#each sinks as sink, index}
  <UISinkOptions {index} value={sink}  on:delete={removeSink}/>
  {/each}
{/if}


<div class="field is-horizontal">
  <div class="field-label">
    <!-- Left empty for spacing -->
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-primary" on:click={saveToServer}>Сохранить</button>
      </div>
    </div>
  </div>
</div>
