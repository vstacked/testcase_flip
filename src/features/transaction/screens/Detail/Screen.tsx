import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { Colors } from '@src/constants/colors';
import { styles } from './Screen.styles';
import { Divider } from '@src/shared/components/Divider';
import Clipboard from '@react-native-clipboard/clipboard';
import { GridDetail } from '../../components/GridDetail';
import { DetailScreenProps } from '@src/navigation/types';
import { Container } from '@src/shared/components/Container';

export const DetailScreen = ({ navigation }: DetailScreenProps) => {
  return (
    <Container>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ID TRANSAKSI:#FT16526923</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            testID="clipboard-button"
            onPress={() => {
              Clipboard.setString('#FT16526923');
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
          <Text style={styles.cardTitleText}>Permata</Text>
          <FontAwesome6 name="arrow-right-long" iconStyle="solid" size={15} />
          <Text style={styles.cardTitleText}>BNI</Text>
        </View>

        <GridDetail
          values={[
            [
              { title: '- SYIFA SALSABYLA', value: '0313955548' },
              { title: 'NOMINAL', value: 'Rp10.028' },
            ],
            [
              { title: 'BERITA TRANSFER', value: 'Note test' },
              { title: 'KODE UNIK', value: '49' },
            ],

            [{ title: 'WAKTU DIBUAT', value: '8 April 2020' }],
          ]}
        />
      </View>
    </Container>
  );
};
