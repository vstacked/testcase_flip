import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@src/constants/colors';
import { Divider } from '@src/shared/components/Divider';
import Clipboard from '@react-native-clipboard/clipboard';
import { DetailScreenProps } from '@src/navigation/types';
import { Container } from '@src/shared/components/Container';
import { styles } from '.';
import { GridDetail, numberUtils, stringUtils } from '../..';

export const DetailScreen = ({ navigation, route }: DetailScreenProps) => {
  const { item } = route.params;
  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ID TRANSAKSI:#{item.id}</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            testID="clipboard-button"
            onPress={() => {
              Clipboard.setString(`#${item.id}`);
            }}
          >
            <FontAwesome6
              name="copy"
              iconStyle="solid"
              size={16}
              color={Colors.secondaryColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.spacing}>
          <Divider color={'rgba(0,0,0,0.02)'} />
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.headerText}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={navigation.goBack}>
            <Text style={{ color: Colors.secondaryColor }}>Tutup</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacing}>
          <Divider color={'rgba(0,0,0,0.1)'} />
        </View>

        <View style={styles.cardTitle}>
          <Text style={styles.cardTitleText}>
            {stringUtils.uppercase(item.senderBank)}
          </Text>
          <FontAwesome6 name="arrow-right-long" iconStyle="solid" size={15} />
          <Text style={styles.cardTitleText}>
            {stringUtils.uppercase(item.beneficiaryBank)}
          </Text>
        </View>

        <GridDetail
          values={[
            [
              {
                title: stringUtils.uppercase(item.beneficiaryName),
                value: item.accountNumber,
              },
              {
                title: 'NOMINAL',
                value: numberUtils.formatAmount(item.amount),
              },
            ],
            [
              { title: 'BERITA TRANSFER', value: item.remark },
              { title: 'KODE UNIK', value: `${item.uniqueCode}` },
            ],

            [
              {
                title: 'WAKTU DIBUAT',
                value: stringUtils.dateFormat(item.createdAt),
              },
            ],
          ]}
        />
      </View>
    </Container>
  );
};
