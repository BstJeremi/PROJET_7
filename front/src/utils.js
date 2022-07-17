import { format } from 'date-fns';

function formatDate(date) {
	return format(new Date(date), 'dd/MM/yyyy HH:ii');
}

export { formatDate };
