<script>
    import { Frame, Elements, notCommon } from "not-bulma";

    const { UITitle } = Elements.Various;
    const { UIButtons } = Elements.Buttons;
    const { COMPONENTS } = Frame;

    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();

    export let index = -1;
    export let value = {};
    export let readonly = false;
    export let disabled = false;
    export let showContent = false;

    function deleteThis(e) {
        e.preventDefault();
        dispatch("delete", { index, _id: value._id, value });
        return false;
    }

    function duplicateThis(e) {
        e.preventDefault();
        dispatch("duplicate", { index, _id: value._id, value });
        return false;
    }

    function toJSONThis() {
        console.log(JSON.stringify(value, null, 4));
    }
</script>

<div class="box">
    <div class="columns">
        <div class="column is-3">
            <div class="control">
                <input
                    type="checkbox"
                    class="switch"
                    id="showContent-edit-rule-options-{value._id}"
                    bind:checked={showContent}
                    name="showContent"
                />
                <label
                    class="label"
                    for="showContent-edit-rule-options-{value._id}"
                    >Показать</label
                >
            </div>
        </div>
        <div class="column">
            <UITitle title={`${value.id} (${value.type})`} size={5} />
        </div>
        <div class="column is-3">
            <div class="control">
                <UIButtons
                    values={[
                        {
                            size: "small",
                            color: "warning",
                            action: duplicateThis,
                            title: "Сделать копию",
                        },
                        {
                            size: "small",
                            color: "info",
                            action: toJSONThis,
                            title: "Сделать копию",
                        },
                        {
                            size: "small",
                            color: "danger",
                            action: deleteThis,
                            title: "Удалить",
                        },
                    ]}
                />
            </div>
        </div>
    </div>
    {#if showContent}
        <div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label" for="edit-sink-rule-{value._id}-id"
                        >ID</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <input
                                id="edit-sink-rule-{value._id}-id"
                                class="input is-success"
                                type="text"
                                placeholder="название"
                                bind:value={value.id}
                                {readonly}
                                {disabled}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label" for="edit-sink-rule-{value._id}-type"
                        >Тип</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-expanded">
                            <div
                                class="select"
                                id="edit-sink-rule-{value._id}-type"
                            >
                                <select
                                    bind:value={value.type}
                                    {readonly}
                                    {disabled}
                                >
                                    <option value="tag">Tag</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {#if value.type && COMPONENTS.get(`UIInformRule${notCommon.capitalizeFirstLetter(value.type)}Settings`)}
                <svelte:component
                    this={COMPONENTS.get(
                        `UIInformRule${notCommon.capitalizeFirstLetter(
                            value.type
                        )}Settings`
                    )}
                    {readonly}
                    {disabled}
                    bind:value
                    on:change
                />
            {:else if value.type}
                <div class="notification is-warning">
                    Интерфейс недоступен для `{value.type}`.
                </div>
            {/if}

            <h5 class="title is-5">Шаблоны</h5>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label
                        class="label"
                        for="edit-sink-rule-{value._id}-data-from">От</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-narrow">
                            <input
                                id="edit-sink-rule-{value._id}-data-from"
                                class="input is-success"
                                type="text"
                                placeholder=""
                                bind:value={value.data.from}
                                {readonly}
                                {disabled}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label
                        class="label"
                        for="edit-sink-rule-{value._id}-data-templates-subject"
                        >Тема</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-narrow">
                            <input
                                id="edit-sink-rule-{value._id}-data-templates-subject"
                                class="input is-success"
                                type="text"
                                placeholder=""
                                bind:value={value.data.templates.subject}
                                {readonly}
                                {disabled}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label
                        class="label"
                        for="edit-sink-rule-{value._id}-data-templates-link"
                        >URL</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-narrow">
                            <input
                                id="edit-sink-rule-{value._id}-data-templates-link"
                                class="input is-success"
                                type="text"
                                placeholder=""
                                bind:value={value.data.templates.link}
                                {readonly}
                                {disabled}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label
                        class="label"
                        for="edit-sink-rule-{value._id}-data-templates-text"
                        >Текстовая версия</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <textarea
                                id="edit-sink-rule-{value._id}-data-templates-text"
                                class="textarea"
                                bind:value={value.data.templates.text}
                                {readonly}
                                {disabled}
                                placeholder=""
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label
                        class="label"
                        for="edit-sink-rule-{value._id}-data-templates-html"
                        >HTML версия</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded">
                            <textarea
                                id="edit-sink-rule-{value._id}-data-templates-html"
                                class="textarea"
                                bind:value={value.data.templates.html}
                                {readonly}
                                {disabled}
                                placeholder=""
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
