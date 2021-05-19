<script>
  import {createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher();
  export let index = -1;
  export let value = {};
  export let readonly = false;
  export let disabled = false;
  let newTag = '';
  export let showContent = false;

  function deleteTag(e){
    e && e.preventDefault();
    let tag = e.currentTarget.dataset.tag;
    if(value.tags.includes(tag)){
      value.tags.splice(value.tags.indexOf(tag), 1);
      value.tags = value.tags;
      value = value;
      dispatch('change',  {_id: value._id, value});
    }
    return false;
  }

  function addTag(){
    if(!value.tags.includes(newTag)){
      value.tags.push(newTag + '');
      value.tags = value.tags;
      value = value;
      newTag = '';
      dispatch('change', {index,_id: value._id, value});
    }
  }

  function deleteThis(e){
    e.preventDefault();
    dispatch('delete', {index, _id: value._id, value});
    return false;
  }

</script>

<div class="box">
  <div class="field is-horizontal">
    <div class="field-label">
      <h5 class="title is-5">{value.id}</h5>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input type="checkbox" class="switch" id="showContent-edit-rule-options-{value._id}" bind:checked={showContent} name="showContent" />
          <label class="label" for="showContent-edit-rule-options-{value._id}">Показать</label>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-danger" on:click={deleteThis}>Удалить</button>
        </div>
      </div>
    </div>
  </div>
  {#if showContent }
  <div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-rule-{value._id}-id">ID</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input id="edit-sink-rule-{value._id}-id" class="input is-success" type="text" placeholder="название" bind:value={value.id} {readonly} {disabled} />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-rule-{value._id}-type">Тип</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <div class="select" id="edit-sink-rule-{value._id}-type">
              <select bind:value={value.type} {readonly} {disabled}>
                <option value="tag">Tag</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    {#if value.type === 'tag' }
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-rule-{value._id}-tags">Метки</label>
      </div>
      <div class="field-body">
        <div class="field" id="edit-sink-rule-{value._id}-tags">
          <p class="control is-narrow">
            {#each value.tags as tag, index }
            <span class="mx-1 tag is-info">{tag}<button data-tag="{tag}" class="delete is-small" on:click="{deleteTag}"></button></span>
            {/each}
          </p>
        </div>
        {#if !readonly && !disabled }
        <div class="field has-addons">
          <p class="control is-narrow">
            <input class="input is-success" type="text" placeholder="новая метка" bind:value={newTag} {readonly} {disabled} />
          </p>
          <div class="control is-small">
            <button class="button is-info" on:click={addTag}>Добавить</button>
          </div>
        </div>
        {/if}
      </div>
    </div>
    {/if}
    <h5 class="title is-5">Шаблоны</h5>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-rule-{value._id}-data-from">От</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-narrow">
            <input id="edit-sink-rule-{value._id}-data-from" class="input is-success" type="text" placeholder="" bind:value={value.data.from} {readonly} {disabled} />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-rule-{value._id}-data-templates-subject">Тема</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-narrow">
            <input id="edit-sink-rule-{value._id}-data-templates-subject" class="input is-success" type="text" placeholder="" bind:value={value.data.templates.subject} {readonly} {disabled} />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-rule-{value._id}-data-templates-text">Текстовая версия</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <textarea id="edit-sink-rule-{value._id}-data-templates-text" class="textarea" bind:value={value.data.templates.text} {readonly} {disabled} placeholder=""></textarea>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-rule-{value._id}-data-templates-html">HTML версия</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <textarea id="edit-sink-rule-{value._id}-data-templates-html" class="textarea" bind:value={value.data.templates.html} {readonly} {disabled} placeholder=""></textarea>
          </p>
        </div>
      </div>
    </div>
  </div>
  {/if}
</div>
