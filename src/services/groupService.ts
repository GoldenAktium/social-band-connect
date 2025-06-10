import { supabase } from '@/integrations/supabase/client';
import type { Group, GroupMember } from '@/types/group';
import { createNotification } from './notificationService';

export async function loadUserGroups(userId: string): Promise<Group[]> {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('owner_id', userId);
    
    if (error) throw error;
    
    return data as Group[] || [];
  } catch (error) {
    console.error('Error loading groups:', error);
    throw error;
  }
}

export async function createGroup(name: string, ownerId: string): Promise<Group> {
  try {
    console.log('Creating group with name:', name, 'owner:', ownerId);
    
    const { data, error } = await supabase
      .from('groups')
      .insert([
        { name: name.trim(), owner_id: ownerId }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error creating group:', error);
      throw error;
    }
    
    if (!data) {
      throw new Error('No data returned from group creation');
    }
    
    console.log('Group created successfully:', data);
    return data as Group;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

export async function inviteMusicianToGroup(
  groupId: string,
  musicianId: string
): Promise<void> {
  try {
    // First check if user is already in the group
    const { data: existingMember, error: checkError } = await supabase
      .from('group_members')
      .select('*')
      .eq('group_id', groupId)
      .eq('user_id', musicianId)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    // If already a member, don't add again
    if (existingMember) return;
    
    const { error: memberError } = await supabase
      .from('group_members')
      .insert([
        { 
          group_id: groupId, 
          user_id: musicianId,
          status: 'invited'
        }
      ]);
    
    if (memberError) throw memberError;

    // Get group details to include in notification
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('name')
      .eq('id', groupId)
      .single();

    if (groupError) throw groupError;

    // Create notification for the invited user
    await createNotification({
      user_id: musicianId,
      type: 'group_invite',
      title: 'Group Invitation',
      message: `You've been invited to join the group "${group.name}"`,
      data: {
        group_id: groupId,
        group_name: group.name
      }
    });
  } catch (error) {
    console.error('Error inviting musician to group:', error);
    throw error;
  }
}

export async function getGroupMembers(groupId: string): Promise<GroupMember[]> {
  try {
    // Get members and their profile data separately to avoid complex joins
    const { data: members, error: membersError } = await supabase
      .from('group_members')
      .select('*')
      .eq('group_id', groupId);
    
    if (membersError) throw membersError;
    if (!members || members.length === 0) return [];

    // Get profile data for all member user_ids
    const userIds = members.map(member => member.user_id);
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, name, avatar_url, instrument')
      .in('id', userIds);
    
    if (profilesError) throw profilesError;

    // Combine the data
    const result = members.map(member => ({
      ...member,
      profiles: profiles?.find(profile => profile.id === member.user_id) || null
    }));

    return result as GroupMember[];
  } catch (error) {
    console.error('Error fetching group members:', error);
    throw error;
  }
}

export async function getGroupDetails(groupId: string): Promise<Group | null> {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    
    return data as Group;
  } catch (error) {
    console.error('Error fetching group details:', error);
    throw error;
  }
}

export async function acceptGroupInvite(groupId: string, userId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('group_members')
      .update({ status: 'accepted' })
      .eq('group_id', groupId)
      .eq('user_id', userId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error accepting group invite:', error);
    throw error;
  }
}

export async function declineGroupInvite(groupId: string, userId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error declining group invite:', error);
    throw error;
  }
}
