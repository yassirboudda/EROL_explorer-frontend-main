<script lang="ts">
	import ClockIcon from 'virtual:icons/hugeicons/clock-02';
	import DateTimeIcon from 'virtual:icons/hugeicons/date-time';
	import moment from 'moment/moment';
	export let timestamp = 0;
</script>

{#if timestamp}
	<div class="row">
		<div class="label">Timestamp</div>
		<div class="value">{timestamp}</div>
		<div class="value">
			<ClockIcon />
			<span>{moment(timestamp * 1000).fromNow()}</span>
		</div>
		<div class="value">
			<DateTimeIcon />
			<span>{moment(timestamp * 1000).format('LLLL')}</span>
		</div>
	</div>
{/if}
