import {
    Box,
    Button,
    Card,
    Flex,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { MdMonetizationOn } from "react-icons/md";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [50, 100, 150, 50, 100, 20],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [50, 100, 150, 50, 100, 20],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const CashFlow = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("green.500", "white");

    return (
        <Card align='center' direction='column' w='100%'>
            <Flex align='center' w='100%' px='15px' py='10px'>
                <Text
                    me='auto'
                    color={textColor}
                    fontSize='xl'
                    fontWeight='700'
                    lineHeight='100%'>
                    Cash Flow
                </Text>
                <Button
                    justifyContent='center'
                    w='37px'
                    h='37px'
                    lineHeight='100%'
                    borderRadius='10px'
                >
                    <Icon as={MdMonetizationOn} color={iconColor} w='24px' h='24px' />
                </Button>
            </Flex>

            <Box width="100%" >
                <Line options={options} data={data} />
            </Box>
        </Card>
    );
}

export default CashFlow