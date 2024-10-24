<script>
    import "bulma-switch";
    import { Frame, Elements, notCommon } from "not-bulma";

    const { COMPONENTS } = Frame;
    const { UITitle } = Elements.Various;
    import { onMount, createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();
    import UIRuleOptions from "./inform.options.rule.svelte";
    import CommonLocal from "../../../../common/index.js";

    import { writable } from "svelte/store";

    const rulesStore = writable({});

    /**
     * @typedef {Object} Props
     * @property {boolean} [readonly]
     * @property {boolean} [disabled]
     * @property {any} [index]
     * @property {boolean} [showContent]
     * @property {any} [value]
     */

    /** @type {Props} */
    let {
        readonly = false,
        disabled = false,
        index = -1,
        showContent = $bindable(false),
        value = $bindable({
        _id: Math.random().toString().slice(3, 10),
        id: "some-rule",
        type: "email",
        account: {
            host: "",
            port: 465,
            secure: true,
            auth: {
                user: "",
                pass: "",
            },
        },
        rules: {},
    })
    } = $props();

    onMount(() => {
        if (typeof value.id === "undefined" || value.id === "undefined") {
            value.id = "Sink";
        }
        $rulesStore = [...Object.values(value.rules)];
        $rulesStore.forEach((val) => {
            if (!val._id) {
                val._id = Math.random().toString().slice(3, 10);
            }
        });
        rulesStore.subscribe((val) => {
            let res = {};
            Object.values(val).forEach((rule) => {
                if (Object.prototype.hasOwnProperty.call(res, rule.id)) {
                    rule.id = rule.id + "-" + 1;
                }
                res[rule.id] = rule;
            });
            value.rules = res;
            value = value;
        });
    });

    function addRule() {
        $rulesStore.unshift({ ...CommonLocal.getDefaultRule() });
        $rulesStore = $rulesStore;
    }

    function removeRule(e) {
        if (e.detail.index > -1) {
            $rulesStore.splice(e.detail.index, 1);
            $rulesStore = $rulesStore;
        }
    }

    function duplicateRule(e) {
        const index = e.detail.index;
        if (index > -1) {
            const ruleCopy = JSON.parse(JSON.stringify($rulesStore[index]));
            ruleCopy.id = ruleCopy.id + "*";
            ruleCopy._id = $rulesStore.length;
            $rulesStore.push(ruleCopy);
            $rulesStore = $rulesStore;
        }
    }

    function deleteThis(e) {
        e.preventDefault();
        dispatch("delete", { index, id: value.id, value });
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
                    id="showContent-edit-sink-options-{value._id}"
                    bind:checked={showContent}
                    name="showContent"
                />
                <label
                    class="label"
                    for="showContent-edit-sink-options-{value._id}"
                    >Показать</label
                >
            </div>
        </div>
        <div class="column">
            <UITitle title={`${value.id} (${value.type})`} size={4} />
        </div>
        <div class="column is-2">
            <div class="control">
                <button class="button is-info" onclick={toJSONThis}
                    >JSON to console</button
                >
                <button class="button is-danger" onclick={deleteThis}
                    >Удалить</button
                >
            </div>
        </div>
    </div>
    {#if showContent}
        <div>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label" for="edit-sink-options-{value._id}-id"
                        >ID</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-narrow">
                            <input
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
                    <label
                        class="label"
                        for="edit-sink-options-{value._id}-type">Тип</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-narrow">
                            <div
                                class="select"
                                id="edit-sink-options-{value._id}-type"
                            >
                                <select
                                    bind:value={value.type}
                                    {readonly}
                                    {disabled}
                                >
                                    <option value="email">Email</option>
                                    <option value="notification"
                                        >Notification</option
                                    >
                                    <option value="ws">WebSockets</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {#if value.type && COMPONENTS.get(`UIInformSink${notCommon.capitalizeFirstLetter(value.type)}Settings`)}
                {@const SvelteComponent = COMPONENTS.get(
                        `UIInformSink${notCommon.capitalizeFirstLetter(
                            value.type
                        )}Settings`
                    )}
                <SvelteComponent
                    {readonly}
                    {disabled}
                    bind:value
                />
            {:else if value.type}
                <div class="notification is-warning">
                    Интерфейс недоступен для `{value.type}`.
                </div>
            {/if}

            <h4 class="title is-4">Правила</h4>
            <div class="field is-horizontal">
                <div class="field-label">
                    <label
                        class="label"
                        for="edit-sink-options-{value._id}-account-host"
                        >Соотвествие</label
                    >
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control is-narrow">
                            <div
                                class="select"
                                id="edit-sink-options-{value._id}-meet"
                            >
                                <select
                                    bind:value={value.meet}
                                    {readonly}
                                    {disabled}
                                >
                                    <option value="all">Всем</option>
                                    <option value="any">Любому</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary" onclick={addRule}
                                >Добавить правило</button
                            >
                        </div>
                    </div>
                </div>
            </div>
            {#if $rulesStore && $rulesStore.length}
                <div class="pl-6">
                    {#each $rulesStore as rule, index (rule._id)}
                        <UIRuleOptions
                            {index}
                            id={rule._id}
                            bind:value={rule}
                            on:delete={removeRule}
                            on:duplicate={duplicateRule}
                        />
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>
