<script lang="ts">
  interface Props {
    label?: string
    name: string
    error?: string
    required?: boolean
    hint?: string
    disabled?: boolean
  }

  export let name: Props['name']
  export let label: Props['label'] = undefined
  export let error: Props['error'] = undefined
  export let required: Props['required'] = false
  export let hint: Props['hint'] = undefined
  export let disabled: Props['disabled'] = false

  $: fieldId = `y-field-${name}`
  $: errorId = `${fieldId}-error`
  $: classes = [
    'y-form-field',
    disabled ? 'y-form-field--disabled' : '',
  ].filter(Boolean).join(' ')
</script>

<div class={classes}>
  {#if label}
    <label for={fieldId} class="y-form-field__label">
      {label}
      {#if required}<span class="y-form-field__required">*</span>{/if}
    </label>
  {/if}
  <slot />
  {#if hint && !error}
    <span class="y-form-field__hint">{hint}</span>
  {/if}
  {#if error}
    <span id={errorId} class="y-form-field__error" role="alert">{error}</span>
  {/if}
</div>
